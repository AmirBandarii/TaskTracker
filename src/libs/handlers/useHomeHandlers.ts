import type React from 'react'
import { useContext } from 'react'
import TodoContext from '../context/TodoContext'
import { errors } from '../messages/errors'

interface IHomeHandlers {
  removeTodo: (id: string) => void
  handleEditClick: (id: string) => void
  handleBlur: (id: string) => void
  toggleDescription: (id: string) => void
  handleChangeEdit: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void
}

export const useHomeHandlers = (): IHomeHandlers => {
  const context = useContext(TodoContext)
  if (context == null) throw new Error(errors.ContextExist)
  const { setTodos, todos, setIsEdit, setIsDescription } = context

  const removeTodo = (id: string): void => {
    const remove = todos.filter(todo => todo.id !== id)
    setTodos(remove)
  }
  const handleEditClick = (id: string): void => {
    setIsEdit((prevEditState) => ({ ...prevEditState, [id]: !prevEditState[id] }))
  }
  const handleBlur = (id: string): void => {
    setIsEdit((prevEditState) => ({ ...prevEditState, [id]: false }))
  }
  const toggleDescription = (id: string): void => {
    setIsDescription((prevDescriptionState) => ({ ...prevDescriptionState, [id]: !prevDescriptionState[id] }))
  }
  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>, todoId: string): void => {
    const updatedTodos = context.todos.map((todo) => todo.id === todoId ? { ...todo, task: e.target.value } : todo)
    context.setTodos(updatedTodos)
  }
  return { removeTodo, handleEditClick, handleBlur, toggleDescription, handleChangeEdit }
}
