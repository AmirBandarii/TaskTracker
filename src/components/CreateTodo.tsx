import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import TodoContext from '../libs/context/TodoContext'
import { useTodoHandlers } from '../libs/handlers/useTodoHandlers'
import { errors } from '../libs/messages/errors'

const CreateTodo: React.FC = () => {
  const { handleChangeTodo, handleChangeDescription, handleTodoAdd } = useTodoHandlers()
  const context = useContext(TodoContext)

  if (context == null) throw new Error(errors.ContextExist)
  const { setModalShow, todo } = context

  return (
    <>
      <Helmet>
        <title>Create New Task | ToDoRise</title>
      </Helmet>

      {/* Backdrop with Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
        onClick={() => { setModalShow(false) }} // Close when clicking outside
      >
        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md overflow-hidden bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20"
        >
          {/* Decorative Header Gradient */}
          <div className="h-2 w-full bg-gradient-to-r from-orange-400 via-pink-400 to-copperCanyon" />

          <header className="px-8 pt-8 pb-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-800 uppercase">
              New Task
            </h2>
            <p className="text-sm text-slate-500 font-medium">What needs to be done today?</p>
          </header>

          <main className="px-8 py-4">
            <form className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1" htmlFor="task">
                  Task Title
                </label>
                <input
                  id="task"
                  type="text"
                  autoFocus
                  value={todo}
                  onChange={handleChangeTodo}
                  placeholder="e.g., Design system audit"
                  className="w-full bg-slate-100/50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400 rounded-2xl p-4 transition-all outline-none font-medium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  onChange={handleChangeDescription}
                  placeholder="Add more details..."
                  className="w-full bg-slate-100/50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-400 rounded-2xl p-4 transition-all outline-none resize-none text-sm"
                />
              </div>

              <div className="flex items-center gap-3 p-1">
                <input
                  id="must-todo"
                  type="checkbox"
                  className="w-5 h-5 rounded-lg border-slate-300 text-orange-500 focus:ring-orange-400 transition-all cursor-pointer"
                />
                <label htmlFor="must-todo" className="text-sm font-bold text-slate-600 cursor-pointer">
                  Mark as High Priority
                </label>
              </div>
            </form>
          </main>

          <footer className="px-8 py-6 bg-slate-50/50 flex gap-3 justify-end items-center">
            <button
              className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
              type="button"
              onClick={() => { setModalShow(false) }}
            >
              Cancel
            </button>
            <button
              className="px-8 py-3 bg-slate-900 text-white font-bold text-sm rounded-2xl shadow-lg hover:bg-orange-500 hover:shadow-orange-200 transition-all active:scale-95"
              type="button"
              onClick={() => {
                handleTodoAdd()
                setModalShow(false)
              }}
            >
              Create Task
            </button>
          </footer>
        </motion.div>
      </motion.div>
    </>
  )
}

export default CreateTodo
