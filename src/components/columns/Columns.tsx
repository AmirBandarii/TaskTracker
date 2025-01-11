import React from 'react'
import { type ITodo } from '../../libs/types/todo'
import TodoContent from './TodoContent'
import TaskCard from '../TaskCard'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

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
    const filteredTodos = (todos.filter((todo) => todo.status === id))
    return (
    <div className=" flex flex-row gap-4 mt-5 justify-center items-center">
      <TodoContent id={id} title={title}>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        <div>
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
        </SortableContext>
      </TodoContent>
    </div>
    )
  }
export default Columns
