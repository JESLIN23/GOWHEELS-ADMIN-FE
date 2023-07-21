import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './context/UserContext';
import { AlertMessageProvider } from './context/AlertMessageContext';
import { OrderProvider } from './context/OrderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AlertMessageProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </AlertMessageProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
