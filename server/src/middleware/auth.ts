import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthContext {
  sub: string;
  org_id: string;
  role?: string;
  email?: string;
}

export function authenticate(required = true) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = req.headers['authorization'];
      if (!auth) {
        if (required) return res.status(401).json({ error: 'missing_authorization' });
        return next();
      }
      const token = auth.replace(/^Bearer\s+/i, '');
      const payload = await verifyToken(token);
      const org_id = (payload as any).org_id || (payload as any)['orgId'] || (payload as any)['org_id'];
      if (!org_id) return res.status(403).json({ error: 'org_id_missing_in_token' });
      (req as any).auth = { sub: String(payload.sub), org_id, role: (payload as any).role, email: (payload as any).email } as AuthContext;
      (req as any).accessToken = token;
      next();
    } catch (e) {
      if (required) return res.status(401).json({ error: 'invalid_token' });
      next();
    }
  };
}
