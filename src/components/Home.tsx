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
  const [isEdit, setIsEdit] = React.useState<Record<string, boolean>>({})
  const [isDescription, setIsDescription] = React.useState<Record<string, boolean>>({})
  if (context === null) {
    throw new Error('Some Component must be used within a TodoProvider')
  }
  const removeTodo = (id: string): void => {
    const remove = context.todos.filter(todo => todo.id !== id)
    context.setTodos(remove)
  }
  const handleEditClick = (id: string): void => {
    setIsEdit((prevEditState) => ({ ...prevEditState, [id]: !prevEditState[id] }))
  }
  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>, todoId: string): void => {
    const updatedTodos = context.todos.map((todo) => todo.id === todoId ? { ...todo, task: e.target.value } : todo)
    context.setTodos(updatedTodos)
  }
  const handleBlur = (id: string): void => {
    setIsEdit((prevEditState) => ({ ...prevEditState, [id]: false }))
  }
  const toggleDescription = (id: string): void => {
    setIsDescription((prevDescriptionState) => ({ ...prevDescriptionState, [id]: !prevDescriptionState[id] }))
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
                            <img className="w-6" src={description} alt="description" onClick = {() => { toggleDescription(todo.id) }} />
                        </Tooltip>
                        {isEdit[todo.id]
                          ? (
                            <input
                              id={todo.id}
                              type="text"
                              value={todo.task}
                              className=" text-base font-medium text-gray-900 dark:text-white w-36 text-center rounded-lg"
                              placeholder="ADD YOUR TASK"
                              name="task"
                              onChange={(e) => { handleChangeEdit(e, todo.id) }}
                              onBlur={() => { handleBlur(todo.id) }}
                              autoFocus
                            />
                            )
                          : (
                            <div>
                              {isDescription[todo.id] && todo.description.trim() !== ''
                                ? (
                                  <div className="flex flex-col items-center justify-center text-center">
                                    <div>
                                      <div className="text-black font-bold break-words whitespace-normal w-44 pl-14 pr-14">{todo.task}</div>
                                      <div className="flex-auto items-center text-center item-center">
                                      <hr className="w-32 mx-auto"/>
                                      </div>
                                    </div>
                                    <div className="flex text-center justify-center w-full h-full">
                                      <div
                                        className="break-words whitespace-normal text-slate-700 font-bold w-36 pl-4 pr-4 pb-4 rounded-lg"
                                      >
                                        {todo.description}
                                      </div>
                                    </div>
                                  </div>
                                  )
                                : (
                                  <div className="w-24 truncate flex-auto text-center">
                                  <div className="text-black font-bold">{todo.task}</div>
                                  </div>
                                  )}
                            </div>
                            )}
                        <div className="flex items-center gap-3">
                          <Tooltip text="Edit">
                            <img className="w-5 cursor-pointer" src={edit} alt="edit" onClick={() => { handleEditClick(todo.id) }
                            } />
                          </Tooltip>
                          <Tooltip text="Delete">
                            <img className="w-5 cursor-pointer " src={trash} alt="trash" onClick={() => {
                              removeTodo(todo.id)
                            }} />
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
