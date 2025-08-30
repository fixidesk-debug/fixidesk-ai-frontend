import cron from 'node-cron';
import { getSupabaseClient } from '../utils/db';

async function aggregateDaily() {
  const supabase = getSupabaseClient();
  await supabase.rpc('aggregate_billing_usage');
}

cron.schedule('0 0 * * *', aggregateDaily);
