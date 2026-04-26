import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster 
      position="bottom-right"
      toastOptions={{
        className: 'toast-custom',
        duration: 3000,
        style: {
          background: 'rgba(20, 20, 50, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#f1f5f9',
          borderRadius: '14px',
          fontFamily: "'Outfit', sans-serif",
        },
      }}
    />
  </React.StrictMode>
);
