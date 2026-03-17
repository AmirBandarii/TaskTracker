import React, { useState } from 'react'
import { type Props } from './valueTypes'
import TodoContext from './TodoContext'
import { type ITodo } from '../types/todo'

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [modalShow, setModalShow] = useState<boolean | undefined>(false)

  // 1. This should just be for the 'Create' input field (an empty string)
  const [todo, setTodo] = useState<string | undefined>('')
  const [description, setDescription] = useState<string>('')
  // 2. MOVE the localStorage logic HERE to initialize your list
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const saved = localStorage.getItem('todo-app-data')
    // Check if data exists and is a valid array
    if (saved != null) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return []
      }
    }
    return []
  })

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
    setIsSameColumn
  }}
  >
      {children}
    </TodoContext.Provider>
  )
}
export default ContextProvider
