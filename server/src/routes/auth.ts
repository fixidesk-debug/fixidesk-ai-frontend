import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';
import { getSupabaseClient } from '../utils/db';

const router = Router();

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
router.post('/login', validateBody(loginSchema), async (req, res) => {
  const { email, password } = (req as any).validated as z.infer<typeof loginSchema>;
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: 'invalid_credentials' });
  res.json({ access_token: data.session?.access_token, refresh_token: data.session?.refresh_token, user: data.user });
});

const refreshSchema = z.object({ refresh_token: z.string().min(10) });
router.post('/refresh', validateBody(refreshSchema), async (req, res) => {
  const { refresh_token } = (req as any).validated as z.infer<typeof refreshSchema>;
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });
  if (error) return res.status(401).json({ error: 'invalid_refresh_token' });
  res.json({ access_token: data.session?.access_token, refresh_token: data.session?.refresh_token });
});

export default router;
