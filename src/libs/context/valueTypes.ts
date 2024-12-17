import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { type ITodo } from '../types/todo'
export interface ContextValues {
  todo: string | undefined
  setTodo: Dispatch<SetStateAction<string | undefined>>
  todos: ITodo[]
  setTodos: Dispatch<SetStateAction<ITodo[]>>
  modalShow: boolean | undefined
  setModalShow: Dispatch<SetStateAction<boolean | undefined>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
  isDescriptionOpen: boolean
  setIsDescriptionOpen: Dispatch<SetStateAction<boolean>>
}
export interface Props {
  children: ReactNode
}
