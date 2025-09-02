// import { removeTodo, getTodos } from './todoManger'
import { format } from 'date-fns'
export const renderTodos = function (
  todos,
  onEditClick,
  onDeleteClick,
  container,
  projectId = null
) {
  container.innerHTML = ''
  if (container.classList.contains('right-container')) {
    const title = document.querySelector('.title')
    title.textContent = 'Todos'
  }

  todos.forEach(({ name, description, priority, date, id }) => {
    const todoRow = document.createElement('div')
    todoRow.classList.add('todo-row')
    todoRow.setAttribute('data-id', id)

    const textWrapper = document.createElement('div')
    textWrapper.classList.add('todo-text')

    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.addEventListener('change', (e) => {
      if (checkBox.checked) {
        if (projectId) {
          onDeleteClick(projectId, id, container)
        } else {
          onDeleteClick(id, container)
        }
      }
    })

    const nameEle = document.createElement('p')
    nameEle.classList.add("todo-title")
    nameEle.textContent = name


    const descriptionEle = document.createElement('span')
    descriptionEle.textContent = description

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-btn')
    editBtn.setAttribute('aria-label', 'Edit')
    editBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 20H20.5M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6"
            stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
    editBtn.addEventListener('click', () => {
      console.log(projectId)

      if (projectId) {
        onEditClick(projectId, id, container)
      } else {
        onEditClick(id, container)
      }
    })

    const dueDate = document.createElement("p")
    console.log(date, )
    dueDate.classList.add("date")

    // Disables all dates prior to today
    document.querySelector("#dueDate").setAttribute("min", format(new Date(), 'yyyy-MM-dd'))
    
    dueDate.textContent = date === format(new Date(), 'yyyy-MM-dd') ? "Today" : date;
   

    textWrapper.appendChild(nameEle)
    textWrapper.appendChild(descriptionEle)
    textWrapper.appendChild(dueDate)

    todoRow.appendChild(checkBox)
    todoRow.appendChild(textWrapper)
    todoRow.appendChild(editBtn)

    container.appendChild(todoRow)
  })
}
