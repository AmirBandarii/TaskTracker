import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import Logo from '../libs/icons/logo/logo'
import newTask from '../libs/icons/newTask.png'
import CreateTodo from './CreateTodo'
import TodoContext from '../libs/context/TodoContext'
import { errors } from '../libs/messages/errors'
import { useHomeHandlers } from '../libs/handlers/useHomeHandlers'
import { COLUMNS } from '../libs/objects/columns'
import Columns from './columns/Columns'
import { type DragEndEvent } from '@dnd-kit/core'
import { type ITodo } from '../libs/types/todo'
import { DndContext } from '@dnd-kit/core'

const Home: React.FC = () => {
  const context = useContext(TodoContext)
  if (context === null) {
    throw new Error(errors.ContextExist)
  }
  const { isEdit, isDescription, todos, setTodos } = context
  const { removeTodo, handleEditClick, handleBlur, toggleDescription, handleChangeEdit } = useHomeHandlers()

  function handleDragEnd (event: DragEndEvent): void {
    const { active, over } = event
    if (over === null || over === undefined) return

    const taskId = active.id as string
    const newStatus = over.id as ITodo['status']
    setTodos(() => todos.map((todo => todo.id === taskId ? { ...todo, status: newStatus } : todo)))
  }

  return (
    <div className="bg-goldenSandstone min-h-screen lg:w-full">
      <Helmet>
        <title>Home</title>
        <meta name="description" content="You can elegantly organize your tasks, manage them with precision, and effortlessly track their completion status"/>
      </Helmet>
      <main className="p-5">
        <header className="flex justify-between items-center ">
          <div className="flex gap-3 items-center">
            <div>
              <Logo />
            </div>
            <div>
              <h1 className="font-bold text-2xl">ToDoRise</h1>
            </div>
          </div>
          <div className="flex gap-5">
            <span className="font-bold text-xl">Date</span>
            <span className="font-bold text-xl">Calendar</span>
          </div>
        </header>

        <section className="flex justify-start items-center mt-5 lg:justify-center">
          <div className="flex flex-col items-center">
            <div className="p-3">
              <button type="button" onClick={() => {
                context?.setModalShow((context?.modalShow) === false)
              }}>
                <img className="w-12 lg:w-16 hover:w-20" src={newTask} alt="New Task Icon" />
              </button>
              {(context.modalShow === true) ? (<CreateTodo />) : null}
            </div>
          </div>
          <div></div>
          <div></div>
        </section>
        <div className={' grid auto-cols-auto grid-flow-col justify-center items-center gap-x-4 flex-wrap flex-grow '}>
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map(column => {
              return (
                <div key={column.id}>
                  <Columns
                    id={column.id}
                    title = {column.title}
                    todos={todos}
                    handleBlur={handleBlur}
                    handleChangeEdit={handleChangeEdit}
                    handleEditClick={handleEditClick}
                    isDescription={isDescription}
                    isEdit={isEdit} removeTodo={removeTodo}
                    toggleDescription={toggleDescription}/>
                </div>
              )
            })}
          </DndContext>
        </div>
      </main>
    </div>
  )
}

export default Home
