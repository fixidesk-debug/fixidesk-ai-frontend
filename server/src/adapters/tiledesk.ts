import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { getSupabaseClient } from '../utils/db';

async function webhook(req: Request, res: Response) {
  const supabase = getSupabaseClient();
  const org_id = (req.query.org_id as string) || req.body?.org_id;
  const type = req.body?.type || req.body?.event;
  if (type === 'bot_message') {
    return res.json({ ok: true });
  }
  if (type === 'handoff') {
    const ticket_id = randomUUID();
    await supabase.from('tickets').insert({ id: ticket_id, org_id, inbox_id: null, customer_id: null, subject: 'Tiledesk Escalation', status: 'open', priority: 'normal', meta: { escalation_reason: req.body?.reason || 'unknown', transcript: req.body?.transcript || '' } });
    return res.json({ ok: true, ticket_id });
  }
  return res.status(400).json({ error: 'unsupported_event' });
}

async function response(req: Request, res: Response) {
  const supabase = getSupabaseClient();
  const org_id = (req as any).auth?.org_id || req.body?.org_id;
  const query: string = (req.body?.query || '').toString();
  const { data: docs } = await supabase.from('vector_documents').select('id, content').eq('org_id', org_id).limit(5);
  const snippets = (docs || []).slice(0, 3).map(d => ({ id: d.id, snippet: (d.content || '').slice(0, 200) }));
  const quick_replies = [ { title: 'Yes' }, { title: 'No' }, { title: 'Talk to agent' } ];
  const answer = snippets.length ? `Here is what I found: ${snippets.map(s => s.snippet).join(' ')}` : 'I do not have enough information to answer that. Would you like to talk to an agent?';
  res.json({ answer, quick_replies, sources: snippets.map(s => ({ id: s.id })) });
}

export default { webhook, response };
