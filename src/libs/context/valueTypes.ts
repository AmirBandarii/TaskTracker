import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { type ITodo } from '../types/todo'
export interface ContextValues {
  todo: string | undefined
  setTodo: Dispatch<SetStateAction<string | undefined>>
  todos: ITodo[]
  setTodos: Dispatch<SetStateAction<ITodo[]>>
  modalShow: boolean | undefined
  setModalShow: Dispatch<SetStateAction<boolean | undefined>>
  editTodo: string | undefined
  setEditTodo: Dispatch<SetStateAction<string | undefined>>
  isEditTodo: boolean | null
  setIsEditTodo: Dispatch<SetStateAction<boolean | null>>
}
export interface Props {
  children: ReactNode
}
