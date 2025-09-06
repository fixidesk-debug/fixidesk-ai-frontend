const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } })
  : null;

async function embedWithGemini(input) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=' + GEMINI_API_KEY;
  const body = {
    content: {
      parts: [{ text: input.slice(0, 8000) }]
    }
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error('Gemini embed error: ' + txt);
  }
  const json = await res.json();
  const vec = json?.embedding?.values || json?.embedding?.value || json?.data?.[0]?.embedding || [];
  if (!Array.isArray(vec) || vec.length === 0) throw new Error('No embedding returned');
  return vec;
}

async function chatWithGemini({ system, messages, docs }) {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not configured');
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' + GEMINI_API_KEY;

  const contextBlock = docs.map((d, i) => `Source ${i + 1} (doc:${d.document_id || d.id}):\n${d.text || d.content}\n`).join('\n---\n');
  const userText = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
  const fullPrompt = [
    system,
    'You must answer using only the provided sources when possible. Cite with [Sx].',
    'If uncertain, ask clarifying questions or escalate.',
    contextBlock,
    'Conversation:',
    userText
  ].filter(Boolean).join('\n\n');

  const body = { contents: [{ parts: [{ text: fullPrompt }] }] };
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error('Gemini chat error: ' + txt);
  }
  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
  return text;
}

async function retrieveDocs({ organization_id, query, top_k = 5 }) {
  if (!supabaseAdmin) throw new Error('Supabase admin client not configured');
  const queryEmbedding = await embedWithGemini(query);

  const { data, error } = await supabaseAdmin.rpc('match_embeddings', {
    p_org_id: organization_id,
    p_query_embedding: queryEmbedding,
    p_match_count: top_k
  });
  if (error) throw error;
  return data || [];
}

function estimateConfidence(docs) {
  // Simple heuristic: more results => higher confidence
  if (!docs?.length) return 0.2;
  if (docs.length >= 8) return 0.9;
  if (docs.length >= 5) return 0.75;
  return 0.6;
}

function hashPrompt(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

function chunkText(text, maxChars = 2000) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + maxChars, text.length);
    chunks.push(text.slice(i, end));
    i = end;
  }
  return chunks;
}

async function upsertDocumentWithEmbeddings({ organization_id, name, content }) {
  if (!supabaseAdmin) throw new Error('Supabase admin client not configured');
  if (!organization_id) throw new Error('organization_id required');
  if (!name || !content) throw new Error('name and content required');

  // Insert document
  const { data: doc, error: docErr } = await supabaseAdmin
    .from('documents')
    .insert({ organization_id, name, content, chunked_at: new Date().toISOString() })
    .select('*')
    .single();
  if (docErr) throw docErr;

  // Create embeddings per chunk
  const chunks = chunkText(content);
  let idx = 0;
  for (const ch of chunks) {
    const vec = await embedWithGemini(ch);
    const { error: embErr } = await supabaseAdmin
      .from('embeddings')
      .insert({ organization_id, document_id: doc.id, chunk_idx: idx, vector: vec, text: ch });
    if (embErr) throw embErr;
    idx += 1;
  }
  return { document: doc, chunks: chunks.length };
}

function registerRoutes(app) {
  app.post('/api/orchestrator/suggest-reply', async (req, res) => {
    try {
      const { organization_id, last_messages = [], top_k = 5 } = req.body || {};
      if (!organization_id) return res.status(400).json({ error: 'organization_id required' });
      if (!Array.isArray(last_messages) || last_messages.length === 0) return res.status(400).json({ error: 'last_messages required' });

      const userQuery = last_messages.filter(m => m.role === 'user' || m.role === 'customer').slice(-1)[0]?.content || last_messages.slice(-1)[0]?.content || '';
      if (!userQuery) return res.status(400).json({ error: 'Could not determine user query from last_messages' });

      const docs = await retrieveDocs({ organization_id, query: userQuery, top_k });
      const system = 'You are FixiDesk AI assistant for customer support. Be concise, accurate, and cite sources as [S1], [S2]... when using them.';
      const text = await chatWithGemini({ system, messages: last_messages, docs });
      const confidence = estimateConfidence(docs);

      res.json({ text, confidence, sources: docs.map((d, i) => ({ index: i + 1, document_id: d.document_id || d.id, chunk_idx: d.chunk_idx, preview: (d.text || d.content || '').slice(0, 200) })) });
    } catch (e) {
      console.error('suggest-reply error', e);
      res.status(500).json({ error: 'Failed to generate suggestion' });
    }
  });

  // Ingest raw text into documents + embeddings
  app.post('/api/orchestrator/ingest/text', async (req, res) => {
    try {
      const { organization_id, name, content } = req.body || {};
      const result = await upsertDocumentWithEmbeddings({ organization_id, name, content });
      res.json(result);
    } catch (e) {
      console.error('ingest/text error', e);
      res.status(400).json({ error: e.message || 'Failed to ingest' });
    }
  });

  // Ingest from URL (fetch then extract text)
  app.post('/api/orchestrator/ingest/url', async (req, res) => {
    try {
      const { organization_id, url, name } = req.body || {};
      if (!url) return res.status(400).json({ error: 'url required' });
      const r = await fetch(url);
      const raw = await r.text();
      // naive HTML to text
      const text = raw.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const result = await upsertDocumentWithEmbeddings({ organization_id, name: name || url, content: text });
      res.json(result);
    } catch (e) {
      console.error('ingest/url error', e);
      res.status(400).json({ error: e.message || 'Failed to ingest url' });
    }
  });

  // Twilio voice webhook placeholder: returns 501 until configured via env
  app.post('/webhooks/twilio/voice', (req, res) => {
    const wssUrl = process.env.TWILIO_MEDIA_WSS_URL;
    if (!wssUrl) {
      res.status(501).type('text/xml').send(`<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Say>Voice streaming not configured.</Say></Response>`);
      return;
    }
    res.type('text/xml').send(`<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Start><Stream url=\"${wssUrl}\" /></Start></Response>`);
  });
}

function initTwilioWebSocket(httpServer) {
  try {
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ server: httpServer, path: '/ws/twilio-media' });
    wss.on('connection', (ws) => {
      ws.on('message', async (msg) => {
        try {
          const data = JSON.parse(msg.toString());
          if (data.event === 'start') {
            // connection started
          } else if (data.event === 'media') {
            // media payload base64 in data.media.payload (PCM16)
            // STT/TTS loop would go here
          } else if (data.event === 'stop') {
            ws.close();
          }
        } catch (e) {
          // ignore malformed frame
        }
      });
    });
    console.log('Twilio Media WebSocket initialized at /ws/twilio-media');
  } catch (e) {
    console.warn('ws dependency not available or failed to init:', e.message);
  }
}

module.exports = { registerRoutes, initTwilioWebSocket };
