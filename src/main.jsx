import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootEl = document.getElementById('sleek-invoice-app')
if (import.meta.env.MODE === 'wordpress') {
  rootEl?.classList.add('sleek-wp-embed')
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
