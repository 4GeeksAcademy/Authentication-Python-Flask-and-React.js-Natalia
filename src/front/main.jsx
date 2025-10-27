import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes'; 
import { StoreProvider } from './hooks/useGlobalReducer'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
