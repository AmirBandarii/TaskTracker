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

  const { setTodo, setDescription, todos, setTodos, todo, description, isHighPriority } = context

  const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value)
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value)
  }

  const handleTodoAdd = (): void => {
    if (todo == null) return
    const trimmedTask = todo.trim()

    if (trimmedTask.length > 0) {
      const newTodo: ITodo = {
        id: crypto.randomUUID(),
        task: trimmedTask,
        description: description.trim(),
        status: 'TASK',
        date: formattedDate(),
        isHighPriority
      }
      const newTodoList = [...todos, newTodo]
      setTodos(newTodoList)

      localStorage.setItem('todo-app-data', JSON.stringify(newTodoList))

      setTodo('')
      setDescription('')
    }
  }

  return { handleChangeTodo, handleChangeDescription, handleTodoAdd, todo }
}
