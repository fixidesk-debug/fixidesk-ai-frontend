import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';
import { triage } from '../orchestrator';
import { getSupabaseClient } from '../utils/db';

const router = Router();

const triageSchema = z.object({ message: z.string(), ticket_id: z.string().uuid().optional() });
router.post('/triage', validateBody(triageSchema), async (req, res) => {
  const auth = (req as any).auth;
  const result = await triage(auth.org_id, (req as any).validated.message);
  res.json(result);
});

const executeSchema = z.object({ action: z.object({ name: z.string(), params: z.record(z.any()).optional() }), ticket_id: z.string().uuid().optional(), amount: z.number().optional() });
router.post('/execute', validateBody(executeSchema), async (req, res) => {
  const auth = (req as any).auth;
  const supabase = getSupabaseClient((req as any).accessToken);
  const { data: org } = await supabase.from('orgs').select('id, settings').eq('id', auth.org_id).single();
  const auto_limit = Number(org?.settings?.auto_refund_limit || 0);
  const { action } = (req as any).validated as z.infer<typeof executeSchema>;
  const amount = Number((req as any).validated.amount || action.params?.amount || 0);
  const audit_id = crypto.randomUUID();
  if (action.name === 'refund' && amount > auto_limit) {
    await supabase.from('audit_events').insert({ id: audit_id, org_id: auth.org_id, actor_id: auth.sub, action: 'refund_request', entity: 'ticket', entity_id: (req as any).validated.ticket_id || null, diff: { requires_manager_approval: true, amount } });
    return res.status(202).json({ status: 'pending_approval', audit_id });
  }
  await supabase.from('outbox').insert({ org_id: auth.org_id, event_type: 'action.execute', payload: { action }, processed: false });
  await supabase.from('audit_events').insert({ id: audit_id, org_id: auth.org_id, actor_id: auth.sub, action: 'action_execute', entity: 'ticket', entity_id: (req as any).validated.ticket_id || null, diff: { action } });
  res.json({ status: 'executed', audit_id });
});

export default router;
