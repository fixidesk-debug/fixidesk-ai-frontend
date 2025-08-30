import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { getSupabaseClient } from '../utils/db';
import { validateBody } from '../middleware/validate';
import { idempotency } from '../middleware/idempotency';
import { sanitize } from '../utils/sanitize';

const router = Router();

const createSchema = z.object({
  inbox_id: z.string().uuid(),
  customer: z.object({ name: z.string().optional(), email: z.string().email().optional(), phone: z.string().optional() }).optional(),
  subject: z.string().min(1),
  message: z.object({ body_text: z.string().optional(), body_html: z.string().optional() }),
  priority: z.string().optional(),
});

router.post('/', idempotency(), validateBody(createSchema), async (req, res) => {
  const auth = (req as any).auth;
  const { inbox_id, customer, subject, message, priority } = (req as any).validated as z.infer<typeof createSchema>;
  const supabase = getSupabaseClient((req as any).accessToken);

  let customer_id: string | null = null;
  if (customer?.email) {
    const found = await supabase.from('customers').select('id').eq('org_id', auth.org_id).eq('email', customer.email).maybeSingle();
    if (found.data?.id) customer_id = found.data.id;
  }
  if (!customer_id) {
    const { data: c } = await supabase.from('customers').insert({ org_id: auth.org_id, name: customer?.name || null, email: customer?.email || null, phone: customer?.phone || null }).select('id').single();
    customer_id = c.id;
  }

  const { data: t, error } = await supabase.from('tickets').insert({
    id: randomUUID(),
    org_id: auth.org_id,
    inbox_id,
    customer_id,
    subject,
    status: 'open',
    priority: priority || 'normal',
  }).select('id, org_id, inbox_id, customer_id, subject, status, priority, created_at').single();
  if (error) return res.status(400).json({ error: 'create_failed' });

  if (message?.body_text || message?.body_html) {
    await supabase.from('threads').insert({ id: randomUUID(), ticket_id: t.id, org_id: auth.org_id, type: 'external' });
    const newMsgId = randomUUID();
    await supabase.from('messages').insert({
      id: newMsgId,
      thread_id: null,
      ticket_id: t.id,
      org_id: auth.org_id,
      direction: 'inbound',
      body_text: message.body_text || '',
      body_html: sanitize(message.body_html || ''),
      sender_user_id: null,
      sender_customer_id: customer_id,
      message_uuid: randomUUID(),
      provider: 'internal',
      provider_message_id: null,
    });
    try { const { publish } = await import('../realtime'); publish(`org:${auth.org_id}:inbox:${inbox_id}`, { event: 'message.created', data: { id: newMsgId, ticket_id: t.id } }); } catch {}
  }

  try { const { publish } = await import('../realtime'); publish(`org:${auth.org_id}:inbox:${inbox_id}`, { event: 'ticket.created', data: t }); } catch {}

  res.status(201).json(t);
});

router.get('/', async (req, res) => {
  const auth = (req as any).auth;
  const { status, inbox_id, page = '1', page_size = '20' } = req.query as any;
  const supabase = getSupabaseClient((req as any).accessToken);
  let q = supabase.from('tickets').select('id, subject, status, priority, created_at').eq('org_id', auth.org_id);
  if (status) q = q.eq('status', String(status));
  if (inbox_id) q = q.eq('inbox_id', String(inbox_id));
  const pageNum = Math.max(1, parseInt(String(page), 10));
  const pageSize = Math.min(100, parseInt(String(page_size), 10));
  const from = (pageNum - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await q.range(from, to);
  if (error) return res.status(400).json({ error: 'list_failed' });
  res.json({ data, page: pageNum, page_size: pageSize, total: count ?? undefined });
});

router.get('/:ticket_id', async (req, res) => {
  const auth = (req as any).auth;
  const { ticket_id } = req.params;
  const supabase = getSupabaseClient((req as any).accessToken);
  const { data: t, error } = await supabase.from('tickets').select('*').eq('org_id', auth.org_id).eq('id', ticket_id).single();
  if (error) return res.status(404).json({ error: 'not_found' });
  const { data: msgs } = await supabase.from('messages').select('*').eq('org_id', auth.org_id).eq('ticket_id', ticket_id).order('created_at', { ascending: true });
  res.json({ ticket: t, messages: msgs || [] });
});

const replySchema = z.object({
  type: z.enum(['internal','external']).default('external'),
  channel: z.string().optional(),
  body_text: z.string().optional(),
  body_html: z.string().optional(),
});

router.post('/:ticket_id/reply', idempotency(), validateBody(replySchema), async (req, res) => {
  const auth = (req as any).auth;
  const { ticket_id } = req.params;
  const { type, body_text, body_html } = (req as any).validated as z.infer<typeof replySchema>;
  const supabase = getSupabaseClient((req as any).accessToken);
  const { data: t, error } = await supabase.from('tickets').select('id').eq('org_id', auth.org_id).eq('id', ticket_id).single();
  if (error) return res.status(404).json({ error: 'not_found' });
  const msg = {
    id: randomUUID(),
    thread_id: null,
    ticket_id: t.id,
    org_id: auth.org_id,
    direction: type === 'internal' ? 'note' : 'outbound',
    body_text: body_text || '',
    body_html: sanitize(body_html || ''),
    sender_user_id: (req as any).auth?.sub || null,
    sender_customer_id: null,
    message_uuid: randomUUID(),
    provider: 'internal',
    provider_message_id: null,
  };
  await supabase.from('messages').insert(msg);
  await supabase.from('outbox').insert({ org_id: auth.org_id, event_type: 'message.created', payload: { ticket_id, message_id: msg.id }, processed: false });
  res.status(201).json({ ok: true, message_id: msg.id });
});

export default router;
