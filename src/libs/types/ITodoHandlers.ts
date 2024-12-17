export interface ITodoHandlers {
  handleChangeTodo: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleTodoAdd: () => void
  todo: string | undefined
}
