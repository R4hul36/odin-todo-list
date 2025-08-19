import { v4 as uuidv4 } from 'uuid'

export const createProject = function ({projectName, projectDescription}) {
  const todos = []
  const id = uuidv4()
  return { projectName, projectDescription, todos, id }
}
 