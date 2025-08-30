import { Router } from 'express';
import { getSupabaseClient } from '../utils/db';

const router = Router();

router.post('/publish', async (req, res) => {
  const auth = (req as any).auth;
  const supabase = getSupabaseClient((req as any).accessToken);
  const { data, error } = await supabase.from('outbox').insert({ org_id: auth.org_id, event_type: req.body?.event_type || 'custom', payload: req.body?.payload || {}, processed: false }).select('id').single();
  if (error) return res.status(400).json({ error: 'publish_failed' });
  res.json({ ok: true, id: data.id });
});

export default router;
