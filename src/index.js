import './styles.css'
import { createTodo } from './modules/todo'
import { createProject } from './modules/project'
import {
  removeTodo,
  updateTodo,
  getTodos,
  setTodos,
} from './modules/todoManger'
import { getProjects, setProjects } from './modules/projectManager'
import { renderTodos } from './modules/todoDomController'
import { renderProjects } from './modules/projectDomController'

console.log('hellow world')

// let projects = []

// const myTodo = createTodo(
//   'walking',
//   'walk today evening at 4:00 pm',
//   'medium',
//   '2025, 8, 7'
// )
// todos.push(myTodo)
// console.log(todos)

// todos = updateTodo(
//   todos,
//   todos[0].id,
//   createTodo('Running', 'Run for 30 minutes', 'important', '2025, 8, 11')
// )

// const myProject = createProject('study Math', '2 hours of math')
// projects.push(myProject)
// console.log(projects)

const taskButton = document.querySelector('#add-todo')
const projectButton = document.querySelector('#add-project')
const taskDialog = document.querySelector('#todo-dialog')
const projectDialog = document.querySelector('#project-dialog')

const todoForm = document.querySelector('.todo-form')
const projectForm = document.querySelector('.project-form')

//Todos
taskButton.addEventListener('click', (e) => {
  taskDialog.showModal()
})

let currentEditId = null

function handleEditClick(id) {
  currentEditId = id
  const todo = getTodos().find((t) => t.id === id)
  todoForm.name.value = todo.name
  todoForm.description.value = todo.description
  // todoForm.priority.value = todo.priority
  // todoForm.dueDate.value = todo.date
  taskDialog.showModal()
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(todoForm))

  if (currentEditId) {
    updateTodo(currentEditId, createTodo(formData))
  } else {
    setTodos(createTodo(formData))
  }

  renderTodos(handleEditClick)
  currentEditId = null
  todoForm.reset()
  taskDialog.close()
})

//Projects

projectButton.addEventListener('click', () => {
  projectDialog.showModal()
})

const todoBtnClickOnProject = function (id) {
  console.log('project todo clicked', id)
}

projectDialog.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(projectForm))
  setProjects(createProject(formData))
  console.log(formData)
  console.log(getProjects())
  renderProjects(todoBtnClickOnProject)
  projectDialog.close()
})
