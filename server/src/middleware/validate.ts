import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parse = schema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ error: 'validation_error', details: parse.error.issues });
    (req as any).validated = parse.data;
    next();
  };
}
