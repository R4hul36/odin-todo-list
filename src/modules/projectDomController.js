import { getProjects } from './projectManager'

export const renderProjects = function (handleTodo) {
  const rightSection = document.querySelector('.right')
  const container = document.querySelector('.right-container')
  rightSection.innerHTML = ''
  container.innerHTML = ''
  const title = document.createElement('h1')
  title.textContent = 'Projects'
  rightSection.appendChild(title)

  getProjects().forEach(({ projectName, projectDescription, id }) => {
    // console.log((projectDescription));
    const projectRow = document.createElement('div')
    projectRow.classList.add('project-row')
    projectRow.setAttribute('data-id', id)

    const name = document.createElement('p')
    name.textContent = projectName

    const addTodo = document.createElement('button')
    addTodo.textContent = 'Add Todo'

    addTodo.addEventListener('click', () => {
      handleTodo(id)
    })

    projectRow.appendChild(name)
    projectRow.appendChild(addTodo)

    container.appendChild(projectRow)
    rightSection.appendChild(container)
  })
}
