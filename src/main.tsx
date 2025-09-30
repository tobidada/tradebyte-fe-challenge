import './global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router>
        <App />
      </Router>
  </StrictMode>,
)
