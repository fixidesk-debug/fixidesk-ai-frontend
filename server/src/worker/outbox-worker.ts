import { getSupabaseClient } from '../utils/db';
import { logger } from '../utils/logger';
import { signPayload } from '../utils/sign';
import axios from 'axios';
import { config } from '../config';

async function runOnce() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('outbox').select('*').eq('processed', false).limit(10);
  if (error || !data) return;
  for (const evt of data) {
    try {
      if (evt.event_type === 'action.execute') {
        const url = `${config.n8nBaseUrl.replace(/\/$/, '')}/webhook/fixidesk/${evt.org_id}/refund_flow`;
        const sig = signPayload(evt.payload);
        await axios.post(url, evt.payload, { headers: { 'X-FIXIDESK-SIGN': sig } });
      }
      logger.info({ id: evt.id, type: evt.event_type }, 'Processed');
      await supabase.from('outbox').update({ processed: true }).eq('id', evt.id);
    } catch (e) {
      logger.error({ id: evt.id, err: String(e) }, 'Outbox processing error');
    }
  }
}

setInterval(runOnce, 2000);
