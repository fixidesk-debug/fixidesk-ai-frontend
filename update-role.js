import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pphakciknujtwdzshvij.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwaGFrY2lrbnVqdHdkenNodmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MzY4ODksImV4cCI6MjA3MjAxMjg4OX0.H0WVcRRn8SvQFYCpT3q0_6O-9ccLwcXc83-VnjR_2f0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateUserRole() {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Not authenticated. Please login first.');
      return;
    }

    console.log('Current user:', user.email);

    // Update role to admin
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', user.id)
      .select();

    if (error) {
      console.error('Error updating role:', error.message);
      return;
    }

    console.log('✅ Role updated to admin successfully!');
    console.log('Updated profile:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

updateUserRole();