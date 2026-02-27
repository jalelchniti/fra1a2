import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { installFrenchTtsGuard } from './lib/tts'

const rawBasePath = import.meta.env.BASE_URL || '/'
const basePath = rawBasePath === '/' ? '/' : rawBasePath.replace(/\/$/, '')

if (typeof window !== 'undefined') {
  installFrenchTtsGuard()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
