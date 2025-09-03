import { getProjectsFromLocalStorage, setProjectsToLocalStorage } from "./localStorage"

export const getProjects = function () {
  const projects = getProjectsFromLocalStorage()
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
  const projects = getProjectsFromLocalStorage()
  const project = projects.find((project) => project.id === id)
  if (project) {
    project.todos = todos
    setProjectsToLocalStorage(projects)
  }
  return projects
}

export const removeProject = function (id) {
  const projects = getProjectsFromLocalStorage()
  const updatedProjects = projects.filter((project) => project.id !== id)
  setProjectsToLocalStorage(updatedProjects)
  return updatedProjects
}
