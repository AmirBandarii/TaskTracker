import React from 'react'
import { type ITodo } from '../libs/types/todo'
import alarm from '../libs/icons/alarm.png'
import Tooltip from '../libs/tooltip/Tooltip'
import description from '../libs/icons/description.png'
import edit from '../libs/icons/edit.png'
import trash from '../libs/icons/trash.png'

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

const SectionContainer: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className=" flex  flex-col  flex-grow  w-96 pb-16  h-auto min-h-80 rounded-lg border-4 border-copperCanyon bg-apricotBlush">
    <h2 className="font-bold text-lg text-center">{title}</h2>
    <hr className="mt-2 border-copperCanyon border-2 mx-4" />
    <div className="flex flex-col justify-center items-center">{children}</div>
  </div>
)

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
  const renderTodoContent = (todo: ITodo): React.JSX.Element | null => {
    if (id === 'TIME') {
      return (
        <div className="flex flex-row w-full items-center justify-center pb-4">
          <img className="w-10 h-10" src={alarm} alt="alarm" />
          <span className="text-black lg:font-bold  ">{todo.date}</span>
        </div>
      )
    }
    if (id === 'TASK') {
      return (
        <div className="flex items-center justify-between my-2 border-2 p-2 w-64 rounded-full border-copperCanyon bg-goldenSandstone">
          <Tooltip text="Description">
            <img
              className="w-6 cursor-pointer"
              src={description}
              alt="description"
              onClick={() => { toggleDescription(todo.id) }}
            />
          </Tooltip>
          {isEdit[todo.id]
            ? (
              <input
                id={todo.id}
                type="text"
                aria-label="edit a task"
                value={todo.task}
                className=" text-base font-medium text-gray-900 dark:text-white w-36 text-center rounded-lg"
                placeholder="editTASK"
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
              <img
                className="w-5 cursor-pointer"
                src={edit}
                alt="edit"
                onClick={() => { handleEditClick(todo.id) }}
              />
            </Tooltip>
            <Tooltip text="Delete">
              <img
                className="w-5 cursor-pointer"
                src={trash}
                alt="trash"
                onClick={() => { removeTodo(todo.id) }}
              />
            </Tooltip>
          </div>
        </div>
      )
    }
    if (id === 'DONE') {
      return <div className="text-black font-bold"></div>
    }
    return null
  }

  return (
    <div className=" flex flex-row flex-1 gap-4 mt-5 justify-center items-center">
      <SectionContainer title={title}>
        <div >
        {todos.map((todo) => (
          <div key={todo.id}>{renderTodoContent(todo)}</div>
        ))}
        </div>
      </SectionContainer>
    </div>
  )
}

export default Columns
