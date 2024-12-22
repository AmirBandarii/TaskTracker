import type React from 'react'
import { useContext } from 'react'
import TodoContext from '../context/TodoContext'
import { type ITodo } from '../types/todo'
import { formattedDate } from '../functions/date'
import { type ITodoHandlers } from '../types/ITodoHandlers'
import { errors } from '../messages/errors'

export const useTodoHandlers = (): ITodoHandlers => {
  const context = useContext(TodoContext)

  if (context == null) throw new Error(errors.ContextExist)
  const { setTodo, setDescription, todos, setTodos, todo } = context
  const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value)
  }
  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value)
  }
  const handleTodoAdd = (): void => {
    if (context?.todo?.trim().length !== undefined && context?.todo?.trim().length > 0) {
      const newTodo: ITodo = {
        id: Math.random().toString(),
        task: todo,
        description: context?.description.trim() === '' ? '' : context?.description,
        status: 'TASK',
        date: formattedDate()
      }
      setTodos([...todos, newTodo])
      setTodo('')
      setDescription('')
    }
  }
  return { handleChangeTodo, handleChangeDescription, handleTodoAdd, todo }
}
