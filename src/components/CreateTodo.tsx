import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import TodoContext from '../libs/context/TodoContext'
import { useTodoHandlers } from '../libs/handlers/useTodoHandlers'
import { errors } from '../libs/messages/errors'

const CreateTodo: React.FC = () => {
  const { handleChangeTodo, handleChangeDescription, handleTodoAdd } = useTodoHandlers()
  const context = useContext(TodoContext)
  if (context == null) throw new Error(errors.ContextExist)
  const { setModalShow, todo, modalShow } = context
  return (
    <>
      <Helmet>
        <title>Todo Modal</title>
        <meta
          name="description"
          content="insert and orgoniaze your works every day to have a responsive days :)"
        />
      </Helmet>
      <main className="flex justify-between">
        <section
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl ">
            <article
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-warmSand outline-none focus:outline-none ">
              <header className="flex items-center justify-center p-5  border-b-4 border-solid border-pink rounded-t">
                <h2 className="text-3xl font-semibold font-roboto">CREATE TASK</h2>
              </header>
              <div className="relative p-6 flex-auto">
                <form className="grid grid-cols-1 gap-3 ">
                  <label
                    className="font-roboto text-lg font-semibold"
                    htmlFor="task"
                  >
                    Task
                  </label>
                  <input
                    id="task"
                    type="text"
                    aria-label="Add a new task"
                    value={todo}
                    className="bg-gray-50 border-2 border-pink rounded-lg block p-2.5"
                    onChange={handleChangeTodo}
                    placeholder="ADD YOUR TASK"
                    name="task"
                  />
                  <label
                    className="font-roboto text-lg font-semibold"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className=" bg-gray-50 resize-none border-2 border-pink h-32 rounded-lg p-2"
                    placeholder="ADD ..."
                    id="description"
                    name="description"
                    onChange={handleChangeDescription}
                  />
                  <div className="flex items-center">
                    <input
                      id="must-todo"
                      type="checkbox"
                      aria-label="must to do"
                      className="w-4 h-4 rounded border-2 border-pink "
                    />
                    <label
                      htmlFor="must-todo"
                      className="ms-2 font-roboto  text-sm font-semibold text-gray-900 dark:text-gray-300"
                    >
                      MUST TO DO
                    </label>
                  </div>
                </form>
              </div>

              <footer className="flex items-center justify-end p-6 border-t-4 border-solid border-pink rounded-b">
                <div>
                  <button
                    className="text-red-500 hover:text-pink background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setModalShow(modalShow === false)
                    }}
                  >
                    Close
                  </button>
                </div>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold  text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    handleTodoAdd()
                    setModalShow(modalShow === false)
                  }}
                >
                  Add Item
                </button>
              </footer>
            </article>
          </div>
        </section>
        <div className="opacity-25 fixed inset-0 z-40 bg-black" aria-hidden="true"></div>
      </main>
    </>
  )
}
export default CreateTodo
