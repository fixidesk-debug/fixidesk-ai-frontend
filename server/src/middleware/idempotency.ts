import type { Request, Response, NextFunction } from 'express';
import { getSupabaseClient } from '../utils/db';

export function idempotency() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = (req.headers['idempotency-key'] as string) || '';
    if (!key) return next();
    const org_id = (req as any).auth?.org_id || 'public';
    const supabase = getSupabaseClient((req as any).accessToken);
    const { error } = await supabase.from('idempotency_keys').insert({ key, org_id });
    if (error) {
      return res.status(409).json({ error: 'idempotent_replay' });
    }
    next();
  };
}
