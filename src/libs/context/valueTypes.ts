import type React from 'react'
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
  isEdit: Record<string, boolean>
  setIsEdit: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  isDescription: Record<string, boolean>
  setIsDescription: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  isSameColumn: boolean
  setIsSameColumn: React.Dispatch<React.SetStateAction<boolean>>
  isHighPriority: boolean
  setIsHighPriority: React.Dispatch<React.SetStateAction<boolean>>
}
export interface Props {
  children: ReactNode
}
