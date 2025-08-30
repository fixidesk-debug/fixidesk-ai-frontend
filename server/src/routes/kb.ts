import { Router } from 'express';
import multer from 'multer';
import pdf from 'pdf-parse';
import { marked } from 'marked';
import { randomUUID } from 'crypto';
import { getSupabaseClient } from '../utils/db';
import { embedText } from '../utils/embed';

const upload = multer();
const router = Router();

async function toText(mime: string, buf: Buffer): Promise<string> {
  if (mime === 'application/pdf') {
    const data = await pdf(buf);
    return data.text;
  }
  if (mime.includes('markdown') || mime.includes('md')) {
    return marked.parse(buf.toString('utf8'), { async: false }) as unknown as string;
  }
  if (mime.includes('html')) return buf.toString('utf8');
  return buf.toString('utf8');
}

router.post('/upload', upload.single('file'), async (req, res) => {
  const auth = (req as any).auth;
  if (!req.file) return res.status(400).json({ error: 'file_required' });
  const text = await toText(req.file.mimetype, req.file.buffer);
  const passages: string[] = [];
  const chunkSize = 1000;
  for (let i = 0; i < text.length; i += chunkSize) passages.push(text.slice(i, i + chunkSize));
  const supabase = getSupabaseClient((req as any).accessToken);
  for (const [idx, content] of passages.entries()) {
    await supabase.from('vector_documents').insert({ id: randomUUID(), org_id: auth.org_id, source: 'kb_upload', source_id: String(idx), embedding: null, content, metadata: {} });
  }
  res.json({ ok: true, chunks: passages.length });
});

export default router;
