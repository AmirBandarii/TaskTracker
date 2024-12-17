import React, { useState } from 'react'
import { type Props } from './valueTypes'
import TodoContext from './TodoContext'
import { type ITodo } from '../types/todo'

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [modalShow, setModalShow] = useState<boolean | undefined>(false)
  const [todo, setTodo] = useState<string | undefined>('')
  const [description, setDescription] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false)
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
    isDescriptionOpen,
    setIsDescriptionOpen
  }}
  >
      {children}
    </TodoContext.Provider>
  )
}
export default ContextProvider
