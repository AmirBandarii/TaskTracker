import React from 'react'
import { type ITodo } from '../../libs/types/todo'
import TodoContent from './TodoContent'
import TaskCard from '../TaskCard'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { motion } from 'framer-motion'

interface ColumnProps {
  id: string
  title: string
  todos: ITodo[]
  isEdit: Record<string, boolean>
  isDescription: Record<string, boolean>
  toggleDescription: (id: string) => void
  handleEditClick: (id: string) => void
  handleChangeEdit: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void
  handleBlur: (id: string) => void
  removeTodo: (id: string) => void
}

const Columns: React.FC<ColumnProps> = ({
  id,
  title,
  todos,
  isEdit,
  handleEditClick,
  handleChangeEdit,
  toggleDescription,
  handleBlur,
  removeTodo,
  isDescription
}) => {
  // Logic: Only show tasks that belong to this column's status
  const filteredTodos = todos.filter((todo) => todo.status === id)

  return (
    <div className="flex flex-col w-full min-w-[300px] max-w-sm">
      {/* Column Header Area */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            {title}
          </h2>
          <span className="flex items-center justify-center w-6 h-6 text-xs font-bold bg-white/50 text-slate-600 rounded-full shadow-sm">
            {filteredTodos.length}
          </span>
        </div>
        <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-transparent rounded-full" />
      </div>

      {/* Modernized Container with glass effect */}
      <TodoContent id={id} title={title}>
        <div className="min-h-[500px] rounded-3xl transition-colors">
          <SortableContext
            items={filteredTodos.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-4">
              {filteredTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  layout // Smoothly animates position changes
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <TaskCard
                    handleBlur={handleBlur}
                    handleChangeEdit={handleChangeEdit}
                    handleEditClick={handleEditClick}
                    id={id}
                    isDescription={isDescription}
                    isEdit={isEdit}
                    removeTodo={removeTodo}
                    todo={todo}
                    toggleDescription={toggleDescription}
                  />
                </motion.div>
              ))}

              {/* Empty State Illustration/Placeholder */}
              {filteredTodos.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-300/40 rounded-3xl">
                  <p className="text-slate-400 text-sm font-medium italic">Empty</p>
                </div>
              )}
            </div>
          </SortableContext>
        </div>
      </TodoContent>
    </div>
  )
}

export default Columns
