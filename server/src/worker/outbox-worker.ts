import { getSupabaseClient } from '../utils/db';
import { logger } from '../utils/logger';

async function runOnce() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('outbox').select('*').eq('processed', false).limit(10);
  if (error || !data) return;
  for (const evt of data) {
    try {
      // Dispatch to adapters based on event_type
      logger.info({ evt }, 'Processing outbox event');
      await supabase.from('outbox').update({ processed: true }).eq('id', evt.id);
    } catch (e) {
      logger.error(e);
    }
  }
}

setInterval(runOnce, 2000);
