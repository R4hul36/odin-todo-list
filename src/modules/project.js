import { v4 as uuidv4 } from 'uuid'

export const createProject = function (title, description) {
  const todos = []
  const id = uuidv4()
  return { title, description, todos, id }
}
