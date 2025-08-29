import type { Request, Response } from 'express';
import { getSupabaseClient } from '../utils/db';

async function webhook(req: Request, res: Response) {
  const supabase = getSupabaseClient();
  const org_id = (req.query.org_id as string) || req.body?.org_id;
  const type = req.body?.type || req.body?.event;
  if (type === 'bot_message') {
    return res.json({ ok: true });
  }
  if (type === 'handoff') {
    const ticket_id = crypto.randomUUID();
    await supabase.from('tickets').insert({ id: ticket_id, org_id, inbox_id: null, customer_id: null, subject: 'Tiledesk Escalation', status: 'open', priority: 'normal', meta: { escalation_reason: req.body?.reason || 'unknown', transcript: req.body?.transcript || '' } });
    return res.json({ ok: true, ticket_id });
  }
  return res.status(400).json({ error: 'unsupported_event' });
}

export default { webhook };
