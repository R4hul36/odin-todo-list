import './styles.css'
import { createTodo } from './modules/todo'
import { createProject } from './modules/project'
import {
  removeTodo,
  updateTodo,
  getTodos,
  setTodos,
} from './modules/todoManger'
import {
  getProjects,
  setProjects,
  updateProjectTodo,
} from './modules/projectManager'
import { renderTodos } from './modules/todoDomController'
import { renderProjects } from './modules/projectDomController'
import { add } from 'date-fns/fp'

console.log('hellow world')

let todos = []

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

// renderTodos()
const leftSection = document.querySelector('.left')
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
let currProjectId = null

const handleTodoEditClick = function (id) {
  currentEditId = id
  const todo = getTodos(todos).find((t) => t.id === id)
  todoForm.name.value = todo.name
  todoForm.description.value = todo.description
  // todoForm.priority.value = todo.priority
  // todoForm.dueDate.value = todo.date
  taskDialog.showModal()
}

const handleTodoDeleteClick = function (id, container) {
  todos = removeTodo(todos, id)
  renderTodos(todos, handleTodoEditClick, handleTodoDeleteClick, container)
}

const handleProjectTodoEditClick = function (projectId, id, container) {
  console.log(projectId, id, container, getProjects())
  currProjectId = projectId
  currentEditId = id
  const project = getProjects().find((p) => p.id === projectId)
  const todo = project.todos.find((todo) => todo.id === id)
  todoForm.name.value = todo.name
  todoForm.description.value = todo.description
  taskDialog.showModal()
}

const handleProjectTodoDeleteClick = function (projectId, id, container) {
  currProjectId = projectId
  currentEditId = id
  const project = getProjects().find((p) => p.id === projectId)
  const updatedTodos = removeTodo(project.todos, id)
  updateProjectTodo(projectId, updatedTodos)
  renderTodos(
    updatedTodos,
    handleProjectTodoEditClick,
    handleProjectTodoDeleteClick,
    container,
    projectId
  )
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(todoForm))

  if (currProjectId) {
    let project = getProjects().find((project) => project.id === currProjectId)
    let projectTodos = project.todos
    console.log(projectTodos)
    if (currentEditId) {
      projectTodos = updateTodo(
        projectTodos,
        currentEditId,
        createTodo(formData)
      )
    } else {
      console.log(projectTodos)
      projectTodos = setTodos(projectTodos, createTodo(formData))
    }

    let container = document.querySelector(
      `[data-project-id="${currProjectId}"]`
    )

    updateProjectTodo(currProjectId, projectTodos)
    renderTodos(
      projectTodos,
      handleProjectTodoEditClick,
      handleProjectTodoDeleteClick,
      container,
      currProjectId
    )

    currProjectId = null
    console.log(getProjects())
  } else {
    if (currentEditId) {
      todos = updateTodo(todos, currentEditId, createTodo(formData))
    } else {
      todos = setTodos(todos, createTodo(formData))
    }
    let container = document.querySelector('.right-container')
    renderTodos(todos, handleTodoEditClick, handleTodoDeleteClick, container)
  }

  currentEditId = null
  todoForm.reset()
  taskDialog.close()
})
//Projects

projectButton.addEventListener('click', () => {
  projectDialog.showModal()
})

const todoBtnClickOnProject = function (id) {
  // console.log('project todo clicked', id)
  taskDialog.showModal()
  currProjectId = id
}

projectDialog.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(projectForm))
  setProjects(createProject(formData))
  // console.log(formData)
  // console.log(getProjects())
  renderProjects(todoBtnClickOnProject, handleProjectTodoEditClick, handleProjectTodoDeleteClick)
  projectDialog.close()
})

leftSection.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.classList.contains('tasks-link')) {
    let container = document.querySelector('.right-container')
    renderTodos(todos, handleTodoEditClick, handleTodoDeleteClick, container)
  } else if (e.target.classList.contains('projects-link')) {
    renderProjects(todoBtnClickOnProject, handleProjectTodoEditClick, handleProjectTodoDeleteClick)
  }
})
