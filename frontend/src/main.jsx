<<<<<<< HEAD
=======
// src/main.jsx
>>>>>>> 524d0b3b50ab42effeeb470293e3f4768291acb0
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> 
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);
