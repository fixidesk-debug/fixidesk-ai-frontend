// Simple debug script to check what's happening
console.log('🔍 Debugging FixiDesk App...');

// Check if environment variables are loaded
console.log('Environment check:');
console.log('VITE_SUPABASE_URL:', import.meta.env?.VITE_SUPABASE_URL || 'NOT SET');
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env?.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');

// Check if DOM is ready
console.log('DOM ready:', document.readyState);
console.log('Root element:', document.getElementById('root') ? 'EXISTS' : 'MISSING');

// Check for any immediate errors
window.addEventListener('error', (e) => {
  console.error('❌ Runtime Error:', e.error?.message || e.message);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('❌ Unhandled Promise:', e.reason);
});

console.log('✅ Debug script loaded');