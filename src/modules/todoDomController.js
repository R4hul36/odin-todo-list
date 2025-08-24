// import { removeTodo, getTodos } from './todoManger'

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
    checkBox.addEventListener("change", (e) => {
      if(checkBox.checked) {
        if (projectId) {
        onDeleteClick(projectId, id, container)
      } else {
        onDeleteClick(id, container)
      }
      }
    })

    const nameEle = document.createElement('p')
    nameEle.textContent = name

    const descriptionEle = document.createElement('span')
    descriptionEle.textContent = description

    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.addEventListener('click', () => {
      console.log(projectId)

      if (projectId) {
        onEditClick(projectId, id, container)
      } else {
        onEditClick(id, container)
      }
    })

    // const deleteBtn = document.createElement('button')
    // deleteBtn.textContent = 'Delete'
    // deleteBtn.addEventListener('click', () => {
    //   if (projectId) {
    //     onDeleteClick(projectId, id, container)
    //   } else {
    //     onDeleteClick(id, container)
    //   }
    // })

    textWrapper.appendChild(nameEle)
    textWrapper.appendChild(descriptionEle)

    todoRow.appendChild(checkBox)
    todoRow.appendChild(textWrapper)
    todoRow.appendChild(editBtn)
    // todoRow.appendChild(deleteBtn)

    container.appendChild(todoRow)
  })
}
