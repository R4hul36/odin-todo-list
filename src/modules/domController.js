export const renderTodos = function (todos) {
  console.log(todos)
  const container = document.querySelector('.right-container')
  container.innerHTML = ''

  todos.forEach(({ name, description, priority }) => {
    const todoRow = document.createElement('div')
    todoRow.classList.add('todo-row')
    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    const nameEle = document.createElement('p')
    const descriptionEle = document.createElement('span')

    nameEle.textContent = name
    descriptionEle.textContent = description
    checkBox.addEventListener('change', () => {
      if (checkBox.checked) {
        console.log('sdfsdf')
      } else {
        console.log('not checked')
      }
    })

    todoRow.appendChild(checkBox)
    todoRow.appendChild(nameEle)
    todoRow.appendChild(descriptionEle)
    container.appendChild(todoRow)
  })
}
