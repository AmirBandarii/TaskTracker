import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../libs/icons/logo/logo'
import { ClipboardPlus } from 'lucide-react'
import CreateTodo from './CreateTodo'
import TodoContext from '../libs/context/TodoContext'
import { errors } from '../libs/messages/errors'
import { useHomeHandlers } from '../libs/handlers/useHomeHandlers'
import { COLUMNS } from '../libs/objects/columns'
import Columns from './columns/Columns'
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useSensors,
  useSensor,
  TouchSensor,
  type DragOverEvent,
  type DragEndEvent,
  type UniqueIdentifier
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { type ITodo } from '../libs/types/todo'

const Home: React.FC = () => {
  const context = useContext(TodoContext)
  if (context === null) throw new Error(errors.ContextExist)

  const { isEdit, isDescription, todos, setTodos, modalShow, setModalShow } = context
  const { removeTodo, handleEditClick, handleBlur, toggleDescription, handleChangeEdit } = useHomeHandlers()
  const findColumn = (id: UniqueIdentifier): UniqueIdentifier | string | null => {
    if (COLUMNS.find((col) => col.id === id) != null) return id
    const task = todos.find((t) => t.id === id)
    return (task != null) ? task.status : null
  }

  // 1. Logic for moving between columns (Cross-Column)
  const handleDragOver = (event: DragOverEvent): void => {
    const { active, over } = event
    if (over == null) return

    const activeId = active.id
    const overId = over.id

    // Find the source and destination containers (columns)
    const activeContainer = findColumn(activeId)
    const overContainer = findColumn(overId)

    if (activeContainer == null || overContainer == null || activeContainer === overContainer) {
      return
    }

    setTodos((prev) => {
      const activeIndex = prev.findIndex((i) => i.id === activeId)
      const overIndex = prev.findIndex((i) => i.id === overId)

      // Create a new array to avoid direct mutation
      const newTodos = [...prev]

      // Update the status of the dragged item to the new column's status
      newTodos[activeIndex] = {
        ...newTodos[activeIndex],
        status: overContainer as ITodo['status']
      }

      // Move the item to the new index position in the array immediately
      // This prevents the "jumping" effect between columns
      return arrayMove(newTodos, activeIndex, overIndex === -1 ? activeIndex : overIndex)
    })
  }

  // 2. Logic for final sorting (Up/Down)
  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event
    if (over == null) return

    if (active.id !== over.id) {
      const activeIndex = todos.findIndex((i) => i.id === active.id)
      const overIndex = todos.findIndex((i) => i.id === over.id)

      const updated = arrayMove(todos, activeIndex, overIndex)
      setTodos(updated)
      localStorage.setItem('todo-app-data', JSON.stringify(updated))
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8 // Drag only starts after moving 8px
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // For mobile: hold for 250ms to drag
        tolerance: 5
      }
    })
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8D5C4] to-[#F8F1F1] text-slate-800">
      <Helmet>
        <title>ToDoRise | Dashboard</title>
      </Helmet>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Modern Glass Header */}
        <header className="flex justify-between items-center mb-10 p-5 bg-white/30 backdrop-blur-md rounded-3xl border border-white/20 shadow-sm">
          <div className="flex gap-4 items-center">
            <Logo />
            <h1 className="font-extrabold text-2xl tracking-tight text-slate-900">ToDoRise</h1>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs uppercase tracking-widest text-slate-400">Yerevan, AM</span>
            <span className="font-bold">{new Date().toLocaleDateString()}</span>
          </div>
        </header>

        {/* Action Button */}
        <div className="flex justify-center mb-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setModalShow(modalShow === false) }}
            className="p-1 bg-slate-900 rounded-full shadow-2xl"
          >
            <ClipboardPlus className="w-14 h-14 invert"/>
          </motion.button>
        </div>

        <AnimatePresence>
          {(modalShow === true) && <CreateTodo />}
        </AnimatePresence>

        {/* The Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {COLUMNS.map((column) => (
              <Columns
                key={column.id}
                id={column.id}
                title={column.title}
                todos={todos}
                handleBlur={handleBlur}
                handleChangeEdit={handleChangeEdit}
                handleEditClick={handleEditClick}
                isDescription={isDescription}
                isEdit={isEdit}
                removeTodo={removeTodo}
                toggleDescription={toggleDescription}
              />
            ))}
          </DndContext>
        </div>
      </main>
    </div>
  )
}

export default Home
