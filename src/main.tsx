import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { useThemeStore } from './store/theme-store.ts';
import { applyThemeClass } from './lib/utils.ts';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';



function Main() {
  const { theme } = useThemeStore();
  applyThemeClass(theme);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Main />
);