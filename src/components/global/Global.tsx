import React from 'react'
import Home from '../Home'
import './mobile.css'
import Mobile from './mobile/Mobile'

const Global: React.FC = () => {
  return (
    <div>
      <div className="desktop-only">
        <Home />
      </div>
      <div className="mobile-only">
        <Mobile />
      </div>
    </div>
  )
}

export default Global
