import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminProvider } from './components/AdminContext';
import { UserProvider } from './components/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <AdminProvider>
      
    <App />
    
    </AdminProvider>
    </UserProvider>
  </React.StrictMode>
);

