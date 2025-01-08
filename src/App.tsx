import React from 'react'
import Global from './components/global/Global'
import ContextProvider from './libs/context/ContextProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Global/>} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
