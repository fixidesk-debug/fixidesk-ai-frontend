import { Router } from 'express';
import chatwoot from '../adapters/chatwoot';
import tiledesk from '../adapters/tiledesk';
import twilio from '../adapters/twilio';

const router = Router();

router.post('/webhook/chatwoot', chatwoot.webhook);
router.post('/webhook/tiledesk', tiledesk.webhook);
router.post('/webhook/twilio', twilio.webhook);
router.post('/webhook/twilio/call', twilio.webhook);
router.post('/tiledesk/response', tiledesk.response);

export default router;
