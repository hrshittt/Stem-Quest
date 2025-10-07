import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './i18n.jsx'
import './index.css'

// Add error boundary logging
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', { message, source, lineno, colno, error });
  return false;
};

const root = document.getElementById('root');
if (!root) {
  console.error('Root element not found!');
} else {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </React.StrictMode>
    );
    console.log('App mounted successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
  }
}
