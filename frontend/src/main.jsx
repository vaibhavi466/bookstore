

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom'; // Correct name
import { Provider } from 'react-redux';
import store from './store/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Must match the import */}
      <Provider store={store}> {/* ✅ Must pass the store */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
