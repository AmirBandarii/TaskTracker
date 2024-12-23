import React, { type FC } from 'react'

const TodoContent: FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div
      className=" flex  flex-col  flex-grow  w-96 pb-16  h-auto min-h-80 rounded-lg border-4 border-copperCanyon bg-apricotBlush">
      <h2 className="font-bold text-lg text-center">{title}</h2>
      <hr className="mt-2 border-copperCanyon border-2 mx-4" />
      <div className="flex flex-col justify-center items-center">{children}</div>
    </div>
  )
}

export default TodoContent
