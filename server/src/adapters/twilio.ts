import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { getSupabaseClient } from '../utils/db';

async function webhook(req: Request, res: Response) {
  const event = req.body?.CallStatus || req.body?.event;
  if (event === 'initiated' || req.path.endsWith('/call')) {
    const org = (req.query.org as string) || (req.query.org_id as string) || '';
    const response = `<?xml version="1.0" encoding="UTF-8"?><Response><Start><Stream url="wss://fixidesk/api/v1/voice/stream?org=${org}"/></Start></Response>`;
    res.set('Content-Type', 'text/xml');
    return res.send(response);
  }
  if (event === 'completed') {
    const supabase = getSupabaseClient();
    const org_id = req.query.org_id as string;
    await supabase.from('tickets').insert({ id: randomUUID(), org_id, inbox_id: null, customer_id: null, subject: 'Call Summary', status: 'closed', priority: 'normal' });
    return res.json({ ok: true });
  }
  return res.json({ ok: true });
}

export default { webhook };
