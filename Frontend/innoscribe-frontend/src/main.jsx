// src/main.jsx (or src/index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' in React 18+
import App from './App';
import './styles.css';  // Ensure this is imported for global styling

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
