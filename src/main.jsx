// src/main.jsx
import './moonstate.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
