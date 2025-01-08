import React from 'react'
import { type ITodo } from '../../libs/types/todo'
import TodoContent from './TodoContent'
import TaskCard from '../TaskCard'
import { useDroppable } from '@dnd-kit/core'

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
const Columns: React.FC<ColumnProps> =
  ({
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
    const { isOver, setNodeRef } = useDroppable({
      id
    })
    const style = {
      opacity: isOver ? 0.5 : 1
    }
    const filteredTodos = (todos.filter((todo) => todo.status === id))
    return (
    <div className=" flex flex-row gap-4 mt-5 justify-center items-center">
      <TodoContent title={title}>
        <div ref={setNodeRef} style={style}>
          {filteredTodos.map((todo) => (
            <TaskCard
              key={todo.id}
              handleBlur={handleBlur}
              handleChangeEdit={handleChangeEdit}
              handleEditClick={handleEditClick}
              id={id}
              isDescription={isDescription}
              isEdit={isEdit}
              removeTodo={removeTodo}
              todo={todo}
              toggleDescription={toggleDescription}/>
          ))}
        </div>
      </TodoContent>
    </div>
    )
  }
export default Columns
