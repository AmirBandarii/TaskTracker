import React from 'react'
import './App.css'
import Home from './components/Home'
import ContextProvider from './libs/context/ContextProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
