import React, { useState } from 'react'
import { type TooltipProps } from '../types/tooltip'

const Tooltip: React.FC<TooltipProps > = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => { setIsVisible(true) }}
      onMouseLeave={() => { setIsVisible(false) }}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full mb-2 w-max bg-copperCanyon text-white text-sm rounded px-2 py-1 z-50">
          {text}
        </div>
      )}
    </div>
  )
}
export default Tooltip
