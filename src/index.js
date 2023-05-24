import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './context/UserContext';
import { AlertMessageProvider } from './context/AlertMessageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AlertMessageProvider>
        <App />
      </AlertMessageProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
