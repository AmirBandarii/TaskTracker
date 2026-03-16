import React, { type FC, useContext } from 'react'
import type { ITodo } from '../libs/types/todo'
import Tooltip from '../libs/tooltip/Tooltip'
import { FileSearchCorner, SquarePen, Shredder } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { errors } from '../libs/messages/errors'
import TodoContext from '../libs/context/TodoContext'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface ITaskCardProps {
  id: string
  isEdit: Record<string, boolean>
  isDescription: Record<string, boolean>
  toggleDescription: (id: string) => void
  handleEditClick: (id: string) => void
  handleChangeEdit: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void
  handleBlur: (id: string) => void
  removeTodo: (id: string) => void
  todo: ITodo
}

const TaskCard: FC<ITaskCardProps> = ({
  id, isEdit, handleEditClick, handleChangeEdit,
  toggleDescription, isDescription, handleBlur, removeTodo, todo
}) => {
  const context = useContext(TodoContext)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Translate.toString(transform), // Translate is smoother than Transform
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.6 : 1,
    scale: isDragging ? 1.02 : 1
  }

  if (context === null) throw new Error(errors.ContextExist)
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        group relative w-full bg-white rounded-[1.5rem] p-4 
        border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-200 
        transition-all duration-300 cursor-grab active:cursor-grabbing
        ${id === 'DONE' ? 'opacity-75 grayscale-[0.5]' : ''}
      `}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <Tooltip text="Description">
              <button
                onClick={(e) => { e.stopPropagation(); toggleDescription(todo.id) }}
                className="p-1 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <FileSearchCorner className="w-5 h-5 opacity-60 hover:opacity-100" />
              </button>
            </Tooltip>

            {isEdit[todo.id]
              ? (
              <input
                autoFocus
                className="bg-slate-50 border-none ring-2 ring-orange-400 rounded-md px-2 py-0.5 text-sm font-semibold w-full outline-none"
                value={todo.task}
                onChange={(e) => { handleChangeEdit(e, todo.id) }}
                onBlur={() => { handleBlur(todo.id) }}
              />
                )
              : (
              <h3 className={`font-bold text-slate-800 text-sm truncate ${id === 'DONE' ? 'line-through text-slate-400' : ''}`}>
                {todo.task}
              </h3>
                )}
          </div>
          <div className="flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); handleEditClick(todo.id) }} className="p-1.5 hover:bg-slate-100 rounded-full">
              <SquarePen className="w-4 h-4 opacity-50 hover:opacity-100" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); removeTodo(todo.id) }} className="p-1.5 hover:bg-red-50 rounded-full">
              <Shredder className="w-4 h-4 opacity-50 hover:opacity-100" />
            </button>
          </div>
        </div>

        {/* Animated Description Area */}
        <AnimatePresence>
          {isDescription[todo.id] && (todo.description !== '') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 leading-relaxed italic">
                {todo.description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {id === 'DONE' && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
          COMPLETED
        </div>
      )}
    </div>
  )
}

export default TaskCard
