import React, { useState } from 'react'
import { type Props } from './valueTypes'
import TodoContext from './TodoContext'
import { type ITodo } from '../types/todo'

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [modalShow, setModalShow] = useState<boolean | undefined>(false)
  const [todo, setTodo] = useState<string | undefined>('')
  const [description, setDescription] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const saved = localStorage.getItem('todo-app-data')

    if (saved == null) return []

    try {
      return JSON.parse(saved)
    } catch {
      return []
    }
  })

  const [isHighPriority, setIsHighPriority] = useState(false)
  const [isEdit, setIsEdit] = React.useState<Record<string, boolean>>({})
  const [isDescription, setIsDescription] = React.useState<Record<string, boolean>>({})
  const [isSameColumn, setIsSameColumn] = React.useState<boolean>(false)
  return (
    <TodoContext.Provider
  value={{
    todo,
    setTodo,
    description,
    setDescription,
    todos,
    setTodos,
    modalShow,
    setModalShow,
    isEdit,
    setIsEdit,
    isDescription,
    setIsDescription,
    isSameColumn,
    setIsSameColumn,
    isHighPriority,
    setIsHighPriority
  }}
  >
      {children}
    </TodoContext.Provider>
  )
}
export default ContextProvider
