import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import Logo from '../libs/icons/logo/logo'
import newTask from '../libs/icons/newTask.png'
import description from '../libs/icons/description.png'
import Todo from './Todo'
import TodoContext from '../libs/context/TodoContext'
import edit from '../libs/icons/edit.png'
import trash from '../libs/icons/trash.png'
import alarm from '../libs/icons/alarm.png'
import Tooltip from '../libs/tooltip/Tooltip'

const Home: React.FC = () => {
  const context = useContext(TodoContext)
  if (context === null) {
    throw new Error('Some Component must be used within a TodoProvider')
  }
  const removeTodo = (id: string): void => {
    const remove = context.todos.filter(todo => todo.id !== id)
    context.setTodos(remove)
  }
  const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    context.setEditTodo(e.target.value)
  }
  const handleEdit = (id: string): void => {
    if (context.isEditTodo === false) {
      context.setIsEditTodo(true)
      const currentTask = context.todos.find(todo => todo.id === id)?.task ?? ''
      context.setEditTodo(currentTask)
    } else {
      if (context.editTodo === '') {
        context.setIsEditTodo(false)
        return
      }
      const updatedTodos = context.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, task: context.editTodo }
        }
        return todo
      })
      context.setTodos(updatedTodos)
      context.setIsEditTodo(false) // Exit edit mode after updating
    }
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
              {(context.modalShow === true) ? (<Todo />) : null}
            </div>
          </div>
          <div></div>
          <div></div>
        </section>
        <section className="flex flex-col items-center mt-5">
          <div className="flex gap-5 lg:grid-cols-3">
            <div className="w-24 h-auto rounded-lg border-4 border-copperCanyon bg-apricotBlush lg:w-96  ">
              <h2 className="font-bold  text-lg  text-center">Time</h2>
              <hr className="mt-2 border-copperCanyon border-2 mx-4" />
              <div className="flex flex-col justify-center items-center">
                {
                  context.todos.map((todo) => (
                    <div key={todo.id}>
                      <div
                        className="flex items-center justify-center my-2  p-2 w-1 lg:w-80  ">
                        <img className="md:w-6" src ={alarm} alt="alarm" />
                        <span className="text-black lg:font-bold lg:ml-2 ">{todo.date}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="w-44 h-auto rounded-lg border-4 border-copperCanyon bg-apricotBlush lg:w-96">
              <h2 className="font-bold text-lg text-center">Task</h2>
              <hr className="mt-2 border-copperCanyon border-2 mx-4" />
              <div className="flex flex-col justify-center items-center">
                {
                  context.todos.map((todo) => (
                    <div key={todo.id}>
                      <div
                        className="flex items-center justify-between my-2 border-2 p-2 w-36 lg:w-64 rounded-full border-copperCanyon bg-goldenSandstone">
                        <Tooltip text="Description">
                        <img className="w-6" src={description} alt="description" />
                        </Tooltip>
                        {(context.isEditTodo === true)
                          ? (
                          <input
                            type="text"
                            value={context?.editTodo}
                            className="w-36 bg-goldenSandstone border-none shadow-none  "
                            onChange={handleChangeTodo}
                            onBlur = {() => { handleEdit(todo.id) }}
                            autoFocus
                          />
                            )
                          : (
                          <span className="text-black font-bold lg:ml-2 lg:pl-5" onClick={() => { context.setIsEditTodo(true) }}>{todo.task}</span>
                            )}
                        <div className="flex items-center gap-3">
                          <Tooltip text="Edit">
                          <img className="w-5" src={edit} alt="edit" onClick={() => { handleEdit(todo.id) }}/>
                          </Tooltip>
                          <Tooltip text="Delete">
                          <img className="w-5" src={trash} alt="trash" onClick={() => { removeTodo(todo.id) }} />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="w-24 h-44 rounded-lg border-4 border-copperCanyon bg-apricotBlush lg:w-96">
              <h2 className="font-bold text-lg text-center">Done</h2>
              <hr className="mt-2 border-copperCanyon border-2 mx-4" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 mt-5 lg:grid-cols-3">
            <div className="w-96 h-36 rounded-lg border-4 border-copperCanyon bg-apricotBlush lg:h-40 ">
              <h2 className="font-bold text-lg text-center">Must do</h2>
              <hr className="mt-2 border-copperCanyon border-2 mx-4" />
            </div>
            <div className="w-96 h-36 rounded-lg border-4 border-copperCanyon bg-apricotBlush lg:h-40">
              <h2 className="font-bold text-lg text-center">Notes</h2>
              <hr className="mt-2 border-copperCanyon border-2 mx-4" />
            </div>
            <div className="w-96 h-36 rounded-lg border-4 border-copperCanyon bg-apricotBlush lg:h-40">
              <h2 className="font-bold text-lg text-center">Mood of a day</h2>
              <hr className="mt-2 border-copperCanyon border-2 mx-4" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
