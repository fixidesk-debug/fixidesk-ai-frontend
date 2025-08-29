import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';
import { triage } from '../orchestrator';

const router = Router();

const triageSchema = z.object({ message: z.string(), ticket_id: z.string().uuid().optional() });
router.post('/triage', validateBody(triageSchema), async (req, res) => {
  const auth = (req as any).auth;
  const result = await triage(auth.org_id, (req as any).validated.message);
  res.json(result);
});

export default router;
