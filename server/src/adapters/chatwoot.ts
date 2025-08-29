import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { getSupabaseClient } from '../utils/db';

async function webhook(req: Request, res: Response) {
  const event = req.body?.event || req.body?.type;
  const payload = req.body?.data || req.body;
  const supabase = getSupabaseClient();
  if (event === 'conversation_created') {
    const org_id = req.query.org_id as string;
    const provider_inbox_id = String(payload?.conversation?.inbox_id || '');
    const inbox = await supabase.from('inboxes').select('id, org_id').eq('org_id', org_id).eq('provider_inbox_id', provider_inbox_id).maybeSingle();
    const inbox_id = inbox.data?.id || null;
    const ticket_id = randomUUID();
    await supabase.from('tickets').insert({ id: ticket_id, org_id, inbox_id, customer_id: null, subject: payload?.conversation?.display_id ? `Chatwoot #${payload.conversation.display_id}` : 'Chatwoot Conversation', status: 'open', priority: 'normal' });
    await supabase.from('outbox').insert({ org_id, event_type: 'ticket.created', payload: { ticket_id }, processed: false });
    return res.json({ ok: true, ticket_id });
  }
  if (event === 'message_created') {
    const org_id = req.query.org_id as string;
    const provider_message_id = String(payload?.message?.id || '');
    const existing = await supabase.from('messages').select('id').eq('org_id', org_id).eq('provider_message_id', provider_message_id).maybeSingle();
    if (existing.data) return res.json({ ok: true, idempotent: true });
    const ticket = await supabase.from('tickets').select('id').eq('org_id', org_id).order('created_at', { ascending: false }).limit(1).single();
    const message_id = randomUUID();
    await supabase.from('messages').insert({ id: message_id, thread_id: null, ticket_id: ticket.data.id, org_id, direction: 'inbound', body_text: payload?.message?.content || '', body_html: payload?.message?.content || '', sender_user_id: null, sender_customer_id: null, message_uuid: String(payload?.message?.id), provider: 'chatwoot', provider_message_id });
    return res.json({ ok: true, message_id });
  }
  return res.status(400).json({ error: 'unsupported_event' });
}

export default { webhook };
