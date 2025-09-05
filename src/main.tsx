import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './utils/suppress-extension-errors';

console.log('🚀 Starting FixiDesk App...');
console.log('Environment:', {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'SET' : 'NOT SET',
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
});

// Error fallback component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-4">Please refresh the page or try again later.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh Page
        </button>
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-sm text-gray-500">Error details</summary>
          <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  );
}

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
    
    reactRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
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
