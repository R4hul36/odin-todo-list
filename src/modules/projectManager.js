const projects = []

export const getProjects = function () {
  console.log('gettt')
  return projects
}

export const setProjects = function (project) {
  console.log('settt')
  projects.push(project)
}

export const updateProjectTodo = function (id, todos) {
  const project = projects.find((project) => project.id === id)
  if (project) {
    project.todos = todos
  }
}
