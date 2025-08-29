import { getProjects } from './projectManager'
import { renderTodos } from './todoDomController'
import { getProjectsFromLocalStorage } from './localStorage'

export const renderProjects = function (
  handleTodo,
  onEditClick = () => {},
  onTodoDeleteClick,
  onProjectDeleteClick
) {
  const rightSection = document.querySelector('.right')
  const container = document.querySelector('.right-container')
  
  container.innerHTML = ''
  const title = document.querySelector('.title')
  title.textContent = 'Projects'
  rightSection.appendChild(title)
  rightSection.appendChild(container)
  console.log(getProjectsFromLocalStorage())

  getProjectsFromLocalStorage().forEach(
    ({ projectName, projectDescription, id, todos }) => {
      // console.log((projectDescription));
      const projectRow = document.createElement('div')
      projectRow.classList.add('project-row')
      projectRow.setAttribute('data-id', id)

      const topProjectRow = document.createElement('div')
      topProjectRow.classList.add('project-top-row')

      const name = document.createElement('p')
      name.textContent = projectName

      const removeProjectBtn = document.createElement('button')
      removeProjectBtn.classList.add('remove-btn')
      removeProjectBtn.setAttribute('aria-label', 'Remove')
      removeProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 24 24" 
       width="18" height="18" 
       fill="none" 
       aria-hidden="true">
    <path d="M20 6H4M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M18 6l-1 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 6"
          stroke="currentColor" 
          stroke-width="1.5" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>
    <path d="M10 11v6M14 11v6" 
          stroke="currentColor" 
          stroke-width="1.5" 
          stroke-linecap="round"/>
  </svg>
`
      // removeProjectBtn.textContent = 'Delete'
      removeProjectBtn.addEventListener('click', (e) => {
        console.log('delete project')
        onProjectDeleteClick(id)
      })

      const addTodo = document.createElement('button')
      addTodo.classList.add('project-add-todo')
      addTodo.textContent = '+ Add Todo'

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

      topProjectRow.appendChild(name)
      topProjectRow.appendChild(removeProjectBtn)

      projectRow.appendChild(topProjectRow)

      projectRow.appendChild(projectTodoContainer)
      projectRow.appendChild(addTodo)
      container.appendChild(projectRow)
    }
  )
}
