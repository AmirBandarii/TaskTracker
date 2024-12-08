import React, { useState } from 'react'
import { type Props } from './valueTypes'
import TodoContext from './TodoContext'
import { type ITodo } from '../types/todo'

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [modalShow, setModalShow] = useState<boolean | undefined>(false)
  const [todo, setTodo] = useState<string | undefined>('')
  const [todos, setTodos] = useState<ITodo[]>([])
  const [editTodo, setEditTodo] = useState<string | undefined>('')
  const [isEditTodo, setIsEditTodo] = useState<boolean | null>(false)
  const [editId, setEditId] = useState<string | null>(null)
  return (
    <TodoContext.Provider
  value={{
    todo,
    setTodo,
    todos,
    setTodos,
    modalShow,
    setModalShow,
    editTodo,
    setEditTodo,
    isEditTodo,
    setIsEditTodo,
    editId,
    setEditId
  }}
  >
      {children}
    </TodoContext.Provider>
  )
}
export default ContextProvider
