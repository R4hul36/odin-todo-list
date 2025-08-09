import { removeTodo } from "./todoManger"

export const renderTodos = function (todos) {
  console.log(todos)
  const container = document.querySelector('.right-container')
  container.innerHTML = ''

  todos.forEach(({ name, description, priority, date, id }) => {
    const todoRow = document.createElement('div')
    todoRow.classList.add('todo-row')
    todoRow.setAttribute("data-id", id);

    const textWrapper = document.createElement('div')
    textWrapper.classList.add('todo-text')

    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    const nameEle = document.createElement('p')
    const descriptionEle = document.createElement('span')
    const editBtn = document.createElement('button')
    editBtn.textContent = "Edit"
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = "Delete"
    deleteBtn.addEventListener("click", (e) =>{
      todos = removeTodo(todos, todoRow.dataset.id)
      console.log(todos);
      renderTodos(todos)
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
    textWrapper.appendChild(nameEle);
    textWrapper.appendChild(descriptionEle)
    todoRow.appendChild(checkBox)
    todoRow.appendChild(textWrapper)
    todoRow.appendChild(editBtn)
    todoRow.appendChild(deleteBtn)
    container.appendChild(todoRow)
  })
}
