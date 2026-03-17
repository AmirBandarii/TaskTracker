export interface ITodo {
  id: string
  task: string | undefined
  description: string
  status: 'TASK' | 'DOING' | 'DONE'
  date: string
  isHighPriority: boolean
}
