import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.jsx'
import { IdiomaProvider } from './components/Idioma/Idioma.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IdiomaProvider>
      <App />
    </IdiomaProvider>
  </StrictMode>,
)
