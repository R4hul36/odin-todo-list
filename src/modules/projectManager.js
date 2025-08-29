import { getProjectsFromLocalStorage, setProjectsToLocalStorage } from "./localStorage"
const projects = getProjectsFromLocalStorage()

export const getProjects = function () {
  console.log(projects)
  return projects
}

export const setProjects = function (project) {
  const projects = getProjectsFromLocalStorage()
  projects.push(project)
  setProjectsToLocalStorage(projects)
  return projects
}

export const updateProjectTodo = function (id, todos) {
  const project = projects.find((project) => project.id === id)
  if (project) {
    project.todos = todos
  }
}
 
export const removeProject = function (id, projects) {
  return projects.filter((project) => project.id !== id);
}