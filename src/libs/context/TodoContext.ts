import { createContext } from 'react'
import { type ContextValues } from './valueTypes'

const TodoContext = createContext<ContextValues | null>(null)

export default TodoContext
