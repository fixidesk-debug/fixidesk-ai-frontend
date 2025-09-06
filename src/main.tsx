import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './utils/suppress-extension-errors';
import { AppWrapper, ErrorFallback } from './AppWrapper';

console.log('🚀 Starting FixiDesk App...');
console.log('Environment:', {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'SET' : 'NOT SET',
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
});

function initializeApp() {
  try {
    const root = document.getElementById("root");
    if (!root) {
      console.error('❌ Root element not found');
      document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Error: Root element not found</h1><p>Please check your HTML file.</p></div>';
      return;
    }

    console.log('✅ Root element found, rendering app...');
    const reactRoot = createRoot(root);
    
    reactRoot.render(<AppWrapper />);
    
    console.log('✅ App rendered successfully');
  } catch (error) {
    console.error('❌ Failed to render app:', error);
    const root = document.getElementById("root");
    if (root) {
      const reactRoot = createRoot(root);
      reactRoot.render(<ErrorFallback error={error as Error} />);
    }
  }
}

// Initialize the app
initializeApp();