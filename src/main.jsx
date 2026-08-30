import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuditProvider } from './context/AuditStore.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuditProvider>
      <App />
    </AuditProvider>
  </StrictMode>,
)
