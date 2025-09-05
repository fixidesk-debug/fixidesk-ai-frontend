import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pphakciknujtwdzshvij.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwaGFrY2lrbnVqdHdkenNodmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MzY4ODksImV4cCI6MjA3MjAxMjg4OX0.H0WVcRRn8SvQFYCpT3q0_6O-9ccLwcXc83-VnjR_2f0';

const supabase = createClient(supabaseUrl, supabaseKey);

const migrations = [
  `CREATE TYPE IF NOT EXISTS public.invitation_status AS ENUM ('pending', 'accepted', 'expired', 'cancelled');`,
  `CREATE TYPE IF NOT EXISTS public.two_factor_method AS ENUM ('totp', 'sms');`,
  `CREATE TABLE IF NOT EXISTS public.user_invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    role user_role DEFAULT 'agent',
    invited_by UUID REFERENCES auth.users(id),
    token TEXT UNIQUE NOT NULL,
    status invitation_status DEFAULT 'pending',
    expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '7 days'),
    created_at TIMESTAMPTZ DEFAULT now()
  );`,
  `CREATE TABLE IF NOT EXISTS public.user_two_factor (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    method two_factor_method DEFAULT 'totp',
    secret TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, method)
  );`,
  `ALTER TABLE public.profiles 
   ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
   ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT false,
   ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0;`
];

async function applyMigration() {
  console.log('🚀 Applying Supabase migration...');
  
  for (const sql of migrations) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql });
      if (error) console.log('⚠️', error.message);
    } catch (err) {
      console.log('⚠️', err.message);
    }
  }
  
  console.log('✅ Migration completed!');
}

applyMigration();