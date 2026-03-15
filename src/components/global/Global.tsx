import React from 'react'
import Home from '../Home'
import Mobile from './mobile/Mobile'

const Global: React.FC = () => {
  return (
    <div className="min-h-screen bg-goldenSandstone">

      <div className="hidden md:block">
        <Home />
      </div>

      <div className="block md:hidden">
        <Mobile />
      </div>
    </div>
  )
}

export default Global
