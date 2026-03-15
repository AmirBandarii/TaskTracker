import React, { type FC } from 'react'
import { useDroppable } from '@dnd-kit/core'

const TodoContent: FC<{ title: string, id: string, children: React.ReactNode }> = ({ title, id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id
  })

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col w-full min-h-[400px] pb-10 rounded-[2rem] 
        transition-all duration-300 ease-in-out
        ${isOver
        ? 'bg-orange-100/50 scale-[1.02] ring-2 ring-orange-300 ring-dashed'
        : 'bg-white/40 backdrop-blur-sm border border-white/20'
      }
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
      `}
    >
      {/* Visual Indicator of the Column Header */}
      <div className="p-5 flex flex-col items-center">
        <h2 className="font-extrabold text-slate-700 text-lg tracking-tight uppercase">
          {title}
        </h2>
        {/* Modern alternative to <hr />: A small centered accent bar */}
        <div className="w-8 h-1 bg-orange-400 rounded-full mt-2" />
      </div>

      {/* Task List Container */}
      <div className="flex flex-col px-4 gap-4">
        {children}
      </div>
    </div>
  )
}

export default TodoContent
