import rateLimit from 'express-rate-limit';

export const orgRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  keyGenerator: (req) => (req as any).auth?.org_id || req.ip,
  standardHeaders: true,
  legacyHeaders: false,
});
