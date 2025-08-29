import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';

export function getSupabaseClient(accessToken?: string): SupabaseClient {
  const key = accessToken || config.supabaseServiceRoleKey;
  return createClient(config.supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
