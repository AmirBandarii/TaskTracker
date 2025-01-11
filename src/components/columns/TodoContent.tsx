import React, { type FC } from 'react'
import { useDroppable } from '@dnd-kit/core'

const TodoContent: FC<{ title: string, id: string, children: React.ReactNode }> = ({ title, id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id
  })
  const style = {
    opacity: isOver ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={style} className=" flex  flex-col sm:w-48 md:w-64 lg:w-80  w-96 pb-16  h-auto sm:min-h-80 md:min-h-96 rounded-lg border-4 border-copperCanyon bg-apricotBlush ">
      <h2 className="font-bold text-lg text-center cursor-grab">{title}</h2>
      <hr className="mt-2 border-copperCanyon border-2 mx-4" />
      <div className="flex flex-col justify-center items-center">{children}</div>
    </div>
  )
}

export default TodoContent
