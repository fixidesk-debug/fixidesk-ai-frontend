import { Router } from 'express';
import chatwoot from '../adapters/chatwoot';
import tiledesk from '../adapters/tiledesk';
import twilio from '../adapters/twilio';

const router = Router();

router.post('/webhook/chatwoot', chatwoot.webhook);
router.post('/webhook/tiledesk', tiledesk.webhook);
router.post('/webhook/twilio', twilio.webhook);

export default router;
