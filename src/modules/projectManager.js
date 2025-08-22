import { getProjectsFromLocalStorage } from "./localStorage"
const projects = getProjectsFromLocalStorage()

export const getProjects = function () {
  console.log(projects)
  return projects
}

export const setProjects = function (project) {
  console.log(projects)
  projects.push(project)
  return projects
}

export const updateProjectTodo = function (id, todos) {
  const project = projects.find((project) => project.id === id)
  if (project) {
    project.todos = todos
  }
}
 