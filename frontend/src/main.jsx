import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'

// Global error handler so the app never shows a blank screen
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  const root = document.getElementById('root');
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;text-align:center;padding:2rem;">
        <div>
          <h2 style="color:#ef4444;">Something went wrong</h2>
          <p style="margin-top:1rem;color:#4b5563;">Check the browser console (F12) for details.</p>
          <p style="margin-top:0.5rem;color:#4b5563;">Most likely your Firebase environment variables are not set correctly in Vercel.</p>
        </div>
      </div>
    `;
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
