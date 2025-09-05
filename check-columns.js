import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pphakciknujtwdzshvij.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwaGFrY2lrbnVqdHdkenNodmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MzY4ODksImV4cCI6MjA3MjAxMjg4OX0.H0WVcRRn8SvQFYCpT3q0_6O-9ccLwcXc83-VnjR_2f0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
  console.log('🔍 Checking profiles table columns...');
  
  // Try to select all columns to see what exists
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);
    
  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log('✅ Available columns:');
    if (data && data.length > 0) {
      console.log(Object.keys(data[0]));
    } else {
      console.log('No data in profiles table');
    }
  }
  
  // Test specific columns
  const testColumns = ['is_active', 'two_factor_enabled', 'login_count', 'last_login', 'organization_id', 'permissions'];
  
  for (const col of testColumns) {
    const { error: colError } = await supabase
      .from('profiles')
      .select(col)
      .limit(1);
      
    if (colError) {
      console.log(`❌ ${col}: Missing`);
    } else {
      console.log(`✅ ${col}: Exists`);
    }
  }
}

checkColumns();