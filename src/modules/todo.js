import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export const createTodo = function (name, description, priority, notes) {
  const date = format(new Date(), 'yyyy-MM-dd')
  const id = uuidv4()

  return { name, description, priority, date, id }
}
