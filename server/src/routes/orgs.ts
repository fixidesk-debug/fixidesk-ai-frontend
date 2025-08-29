import { Router } from 'express';
import { z } from 'zod';
import { getSupabaseClient } from '../utils/db';
import { validateBody } from '../middleware/validate';

const router = Router();

router.get('/:org_id/branding', async (req, res) => {
  const { org_id } = req.params;
  const supabase = getSupabaseClient((req as any).accessToken);
  const { data, error } = await supabase.from('orgs').select('id, settings').eq('id', org_id).single();
  if (error) return res.status(404).json({ error: 'org_not_found' });
  const branding = (data.settings || {}).branding || {};
  res.json({ org_id: data.id, branding });
});

const brandingSchema = z.object({
  logo_url: z.string().url().optional(),
  primary_color: z.string().optional(),
  css: z.string().optional(),
  custom_domain: z.array(z.string()).optional(),
  mail_from: z.string().email().optional(),
  twilio_subaccount_sid: z.string().optional(),
});

router.post('/:org_id/branding', validateBody(brandingSchema), async (req, res) => {
  const auth = (req as any).auth;
  if (!auth || auth.org_id !== req.params.org_id || (auth.role !== 'admin' && auth.role !== 'owner')) {
    return res.status(403).json({ error: 'forbidden' });
  }
  const supabase = getSupabaseClient((req as any).accessToken);
  const { data, error } = await supabase
    .from('orgs')
    .update({ settings: { branding: (req as any).validated } })
    .eq('id', req.params.org_id)
    .select('id, settings')
    .single();
  if (error) return res.status(400).json({ error: 'update_failed' });
  res.json({ org_id: data.id, branding: data.settings?.branding || {} });
});

export default router;
