import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';
import { getSupabaseClient } from '../utils/db';
import { encryptString } from '../utils/crypto';

const router = Router();

const provisionSchema = z.object({ name: z.string(), plan: z.string(), admin_email: z.string().email(), subdomain: z.string(), use_managed_channels: z.boolean().optional() });

router.post('/provision', validateBody(provisionSchema), async (req, res) => {
  const adminKey = req.headers['x-system-admin-key'];
  if (!adminKey || adminKey !== process.env.SYSTEM_ADMIN_KEY) return res.status(401).json({ error: 'unauthorized' });
  const supabase = getSupabaseClient();
  const orgId = crypto.randomUUID();
  await supabase.from('orgs').insert({ id: orgId, name: (req as any).validated.name, plan: (req as any).validated.plan, settings: { branding: { custom_domain: [(req as any).validated.subdomain] } } });
  const inboxId = crypto.randomUUID();
  await supabase.from('inboxes').insert({ id: inboxId, org_id: orgId, name: 'Default Inbox', provider: 'internal', provider_inbox_id: 'default' });
  const { data: user } = await supabase.auth.admin.createUser({ email: (req as any).validated.admin_email, email_confirm: true, user_metadata: { org_id: orgId, role: 'owner' } });
  const apiKey = encryptString(crypto.randomUUID());
  await supabase.from('secrets').insert({ id: crypto.randomUUID(), org_id: orgId, key: 'tenant_api_key', value: apiKey });
  res.json({ org_id: orgId, admin_user_id: user?.user?.id, inbox_id: inboxId, initial_tenant_api_key: apiKey });
});

export default router;
