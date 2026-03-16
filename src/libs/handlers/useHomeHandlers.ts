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

  // Helper function to sync with storage
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const syncStorage = (updatedTodos: any[]) => {
    localStorage.setItem('todo-app-data', JSON.stringify(updatedTodos))
  }

  const removeTodo = (id: string): void => {
    const updated = todos.filter(todo => todo.id !== id)
    setTodos(updated)
    syncStorage(updated) // Keep data persistent
  }

  const handleEditClick = (id: string): void => {
    setIsEdit((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleBlur = (id: string): void => {
    setIsEdit((prev) => ({ ...prev, [id]: false }))
    syncStorage(todos) // Save changes when user finishes editing
  }

  const toggleDescription = (id: string): void => {
    setIsDescription((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>, todoId: string): void => {
    const updatedTodos = todos.map((t) =>
      t.id === todoId ? { ...t, task: e.target.value } : t
    )
    setTodos(updatedTodos)
  }

  return { removeTodo, handleEditClick, handleBlur, toggleDescription, handleChangeEdit }
}
