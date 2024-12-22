import React from 'react'
import './global.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const rootElement = document.getElementById('root')
if (rootElement !== null) {
  const root = createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <DndProvider backend={HTML5Backend}>
      <App />
        </DndProvider>
      </HelmetProvider>
    </React.StrictMode>
  )
}
reportWebVitals()
