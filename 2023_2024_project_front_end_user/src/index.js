import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './contexts/user.context';
import { TransactionProvider } from './contexts/transactions.context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </UserProvider>
  </React.StrictMode>
);
reportWebVitals();
