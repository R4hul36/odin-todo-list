import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export const createTodo = function (name, description, priority, dueDate) {
  const date = format(new Date(dueDate), 'yyyy-MM-dd')
  const id = uuidv4()

  return { name, description, priority, date, id }
}
