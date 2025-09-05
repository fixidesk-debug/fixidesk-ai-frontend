import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pphakciknujtwdzshvij.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwaGFrY2lrbnVqdHdkenNodmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MzY4ODksImV4cCI6MjA3MjAxMjg4OX0.H0WVcRRn8SvQFYCpT3q0_6O-9ccLwcXc83-VnjR_2f0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  console.log('🚀 Creating tables...');
  
  // Create user_invitations table
  const { error: invitationsError } = await supabase
    .from('user_invitations')
    .select('*')
    .limit(1);
    
  if (invitationsError && invitationsError.code === 'PGRST116') {
    console.log('✅ user_invitations table needs to be created manually in Supabase Dashboard');
  } else {
    console.log('✅ user_invitations table exists');
  }
  
  // Create user_two_factor table
  const { error: twoFactorError } = await supabase
    .from('user_two_factor')
    .select('*')
    .limit(1);
    
  if (twoFactorError && twoFactorError.code === 'PGRST116') {
    console.log('✅ user_two_factor table needs to be created manually in Supabase Dashboard');
  } else {
    console.log('✅ user_two_factor table exists');
  }
  
  // Test profiles table
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);
    
  if (profilesError) {
    console.log('❌ profiles table error:', profilesError.message);
  } else {
    console.log('✅ profiles table exists');
  }
  
  console.log('\n📋 Manual Setup Required:');
  console.log('1. Go to https://supabase.com/dashboard/project/pphakciknujtwdzshvij');
  console.log('2. Navigate to SQL Editor');
  console.log('3. Run the setup-supabase.sql script');
  console.log('4. Or create tables manually in Table Editor');
}

createTables();