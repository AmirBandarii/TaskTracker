import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../libs/icons/logo/logo'
import CreateTodo from './CreateTodo'
import TodoContext from '../libs/context/TodoContext'
import { errors } from '../libs/messages/errors'
import { useHomeHandlers } from '../libs/handlers/useHomeHandlers'
import { COLUMNS } from '../libs/objects/columns'
import Columns from './columns/Columns'
import { ClipboardPlus } from 'lucide-react'
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useSensors,
  useSensor,
  type DragEndEvent,
  TouchSensor,
  type UniqueIdentifier
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
// import { type ITodo } from '../libs/types/todo'

const Home: React.FC = () => {
  const context = useContext(TodoContext)

  if (context === null) {
    throw new Error(errors.ContextExist)
  }

  const { isEdit, isDescription, todos, setTodos, modalShow, setModalShow } = context
  const { removeTodo, handleEditClick, handleBlur, toggleDescription, handleChangeEdit } = useHomeHandlers()

  // --- Drag and Drop Logic ---
  const getTaskPos = (id: UniqueIdentifier): number => todos.findIndex((todo) => todo.id === id)

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event
    if (over == null) return

    const activeId = active.id
    const overId = over.id

    if (activeId !== overId) {
      setTodos((items) => {
        const oldIndex = getTaskPos(activeId)
        const newIndex = getTaskPos(overId)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5
      }
    })
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8D5C4] to-[#F8F1F1] text-slate-800 transition-colors duration-500">
      <Helmet>
        <title>ToDoRise | Smart Task Management</title>
        <meta name="description" content="Elegantly organize tasks with precision and modern drag-and-drop technology."/>
      </Helmet>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-10 p-5 bg-white/30 backdrop-blur-md rounded-3xl border border-white/20 ">
          <div className="flex gap-4 items-center">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="p-2 bg-white rounded-xl shadow-sm"
            >
              <Logo />
            </motion.div>
            <h1 className="font-extrabold text-2xl md:text-3xl tracking-tight text-slate-900">
              ToDoRise
            </h1>
          </div>

          <div className="hidden sm:flex gap-6 items-center font-semibold text-slate-600">
            <div className="flex flex-col items-end">
              <span className="text-xs uppercase tracking-widest text-slate-400">Current Date</span>
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        <section className="relative mb-10 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 1.10 }}
            type="button"
            onClick={() => { setModalShow(modalShow === false) }}
            className="group relative flex items-center justify-center p-3 rounded-full bg-white/30 hover:bg-white/90 transition-all"
          >
            <ClipboardPlus className="size-12 " />

            {/*
            <img
              className="w-14 h-14 md:w-16 md:h-16 invert group-hover:rotate-90 transition-transform duration-300"
              src={newTask}
              alt="New Task"
            />
            */}
          </motion.button>

          <AnimatePresence>
            {(modalShow === true) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-20 z-50 w-full max-w-md"
              >
                <CreateTodo />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto pb-10">
          <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            {COLUMNS.map(column => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/40 backdrop-blur-sm p-5 rounded-[2.5rem] min-h-[600px] border border-white/40 shadow-xl"
              >
                <Columns
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
              </motion.div>
            ))}
          </DndContext>
        </div>
      </main>
    </div>
  )
}

export default Home
