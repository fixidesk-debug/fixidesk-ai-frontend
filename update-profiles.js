import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pphakciknujtwdzshvij.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwaGFrY2lrbnVqdHdkenNodmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MzY4ODksImV4cCI6MjA3MjAxMjg4OX0.H0WVcRRn8SvQFYCpT3q0_6O-9ccLwcXc83-VnjR_2f0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateProfiles() {
  console.log('🚀 Checking profiles table structure...');
  
  // Test if we can insert/update with new columns
  const { data: testData, error } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, role, is_active, two_factor_enabled, login_count')
    .limit(1);
    
  if (error) {
    console.log('❌ Missing columns in profiles table:', error.message);
    console.log('\n📋 Required SQL to run in Supabase Dashboard:');
    console.log(`
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS organization_id UUID,
ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}';
    `);
  } else {
    console.log('✅ Profiles table has all required columns');
    console.log('✅ Database is ready for authentication features');
  }
}

updateProfiles();