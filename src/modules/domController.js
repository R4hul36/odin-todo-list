import { removeTodo, getTodos } from './todoManger'

export const renderTodos = function (onEditClick) {
  const container = document.querySelector('.right-container')
  container.innerHTML = ''
  console.log(getTodos())

  getTodos().forEach(({ name, description, priority, date, id }) => {
    const todoRow = document.createElement('div')
    todoRow.classList.add('todo-row')
    todoRow.setAttribute('data-id', id)

    const textWrapper = document.createElement('div')
    textWrapper.classList.add('todo-text')

    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    const nameEle = document.createElement('p')
    const descriptionEle = document.createElement('span')
    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.addEventListener('click', () => {
      onEditClick(id)
    })

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener('click', (e) => {
      removeTodo(todoRow.dataset.id)
      renderTodos()
    })

    nameEle.textContent = name
    descriptionEle.textContent = description
    checkBox.addEventListener('change', () => {
      if (checkBox.checked) {
        console.log('sdfsdf')
      } else {
        console.log('not checked')
      }
    })
    textWrapper.appendChild(nameEle)
    textWrapper.appendChild(descriptionEle)
    todoRow.appendChild(checkBox)
    todoRow.appendChild(textWrapper)
    todoRow.appendChild(editBtn)
    todoRow.appendChild(deleteBtn)
    container.appendChild(todoRow)
  })
}
