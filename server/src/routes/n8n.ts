import { Router } from 'express';
import { getSupabaseClient } from '../utils/db';

const router = Router();

router.post('/callback/:tenant_id/:workflow_id', async (req, res) => {
  const supabase = getSupabaseClient();
  const { tenant_id, workflow_id } = req.params;
  const sign = req.headers['x-fixidesk-sign'];
  // Trust callbacks here (verification could be added with shared secret)
  await supabase.from('outbox').insert({ org_id: tenant_id, event_type: 'n8n.callback', payload: { workflow_id, body: req.body }, processed: false });
  res.json({ ok: true });
});

export default router;
