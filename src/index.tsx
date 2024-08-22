import React from 'react'
import './global.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

const rootElement = document.getElementById('root')
if (rootElement !== null) {
  const root = createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <HelmetProvider>
      <App />
      </HelmetProvider>
    </React.StrictMode>
  )
}
reportWebVitals()
