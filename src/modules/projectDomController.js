import { getProjects } from './projectManager'
import { renderTodos } from './todoDomController'
import { getProjectsFromLocalStorage } from './localStorage'

export const renderProjects = function (handleTodo, onEditClick = () => {},
  onTodoDeleteClick , onProjectDeleteClick) {
  const rightSection = document.querySelector('.right')
  const container = document.querySelector('.right-container')
  container.innerHTML = ''
  const title = document.querySelector('.title')
  title.textContent = 'Projects'
  rightSection.appendChild(title)
  rightSection.appendChild(container)
    console.log(getProjects());
    
  getProjectsFromLocalStorage().forEach(({ projectName, projectDescription, id, todos }) => {
    // console.log((projectDescription));
    const projectRow = document.createElement('div')
    projectRow.classList.add('project-row')
    projectRow.setAttribute('data-id', id)

    const name = document.createElement('p')
    name.textContent = projectName

    const deleteProjectBtn = document.createElement('button')
    deleteProjectBtn.textContent = "Delete"
    deleteProjectBtn.addEventListener("click", (e) => {
      console.log("delete project");
      onProjectDeleteClick(id)
    })

    const addTodo = document.createElement('button')
    addTodo.textContent = 'Add Todo'

    addTodo.addEventListener('click', () => {
      handleTodo(id)
    })

    const projectTodoContainer = document.createElement('div')
    projectTodoContainer.classList.add(`todo-container`)
    projectTodoContainer.dataset.projectId = id

    renderTodos( 
      todos,
      onEditClick,
      onTodoDeleteClick,
      projectTodoContainer,
      id
    )

    projectRow.appendChild(name)
    projectRow.appendChild(deleteProjectBtn)
    projectRow.appendChild(addTodo)
    projectRow.appendChild(projectTodoContainer)
    container.appendChild(projectRow)
  })
}
