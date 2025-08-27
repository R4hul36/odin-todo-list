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
  setTodosToLocalStorage,
  getTodosFromLocalStorage,
  setProjectsToLocalStorage,
  getProjectsFromLocalStorage,
} from './modules/localStorage'

import {
  getProjects,
  setProjects,
  updateProjectTodo,
  removeProject,
} from './modules/projectManager'
import { renderTodos } from './modules/todoDomController'
import { renderProjects } from './modules/projectDomController'
import { add } from 'date-fns/fp'

console.log('hellow world')

let todos = getTodosFromLocalStorage()

const rightContainer = document.querySelector('.right-container')
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
  setTodosToLocalStorage(removeTodo(todos, id))
  todos = getTodosFromLocalStorage()
  renderTodos(todos, handleTodoEditClick, handleTodoDeleteClick, container)
  intialTodosRender()
}

const handleProjectDeleteClick = function (id) {
 
  const projects = getProjectsFromLocalStorage()
  setProjectsToLocalStorage(removeProject(id, projects))
  renderProjects(
    todoBtnClickOnProject,
    handleProjectTodoEditClick,
    handleProjectTodoDeleteClick,
    handleProjectDeleteClick
  )
  initialProjectsRender()
}

const handleProjectTodoEditClick = function (projectId, id, container) {
  currProjectId = projectId
  currentEditId = id
  const projects = getProjectsFromLocalStorage()
  const project = projects.find((p) => p.id === projectId)
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
  setProjectsToLocalStorage(getProjects())
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
    const projects = getProjectsFromLocalStorage()
    let project = projects.find((project) => project.id === currProjectId)
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
    setProjectsToLocalStorage(getProjects())
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
      setTodosToLocalStorage(
        updateTodo(todos, currentEditId, createTodo(formData))
      )
      todos = getTodosFromLocalStorage()
    } else {
      setTodosToLocalStorage(setTodos(todos, createTodo(formData)))
      todos = getTodosFromLocalStorage()
    }
    let container = document.querySelector('.right-container')
    renderTodos(todos, handleTodoEditClick, handleTodoDeleteClick, container)
  }

  currentEditId = null
  todoForm.reset()
  taskDialog.close()
})

const onInitialPageLoad = function (title, msg, btnText, dialog) {
    rightContainer.innerHTML = ''

    document.querySelector(".title").textContent = title
    const emptyTodoContainer = document.createElement('div')
    const message = document.createElement('p')
    message.textContent = msg
    const addBtn = document.createElement('button')
    addBtn.textContent = btnText
    addBtn.classList.add('todo-add-btn')
    addBtn.addEventListener('click', (e) => {
      dialog.showModal()
    })
    emptyTodoContainer.appendChild(message)
    emptyTodoContainer.appendChild(addBtn)
    rightContainer.appendChild(emptyTodoContainer)
}

const intialTodosRender = function () {
  if(todos.length === 0) {
    onInitialPageLoad("Todos", 'No Tasks yet.', '+ Add Todo', taskDialog)
  }else {
    renderTodos(todos, handleTodoEditClick, handleTodoDeleteClick, rightContainer)
  }
}

const initialProjectsRender = function () {
  console.log("deleted");
  
  
  
  if(getProjectsFromLocalStorage().length === 0) {
    onInitialPageLoad("Projects", "No Projects yet.", "+ Add Project", projectDialog)
  }else {
    renderProjects(
      todoBtnClickOnProject,
      handleProjectTodoEditClick,
      handleProjectTodoDeleteClick,
      handleProjectDeleteClick
    )
  }
}

intialTodosRender()

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

  setProjectsToLocalStorage(setProjects(createProject(formData)))

  // console.log(formData)
  // console.log(getProjects())
  renderProjects(
    todoBtnClickOnProject,
    handleProjectTodoEditClick,
    handleProjectTodoDeleteClick,
    handleProjectDeleteClick
  )
  projectDialog.close()
})

leftSection.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.classList.contains('tasks-link')) {
    let container = document.querySelector('.right-container')
    renderTodos(todos, handleTodoEditClick, handleTodoDeleteClick, container)
    onInitialPageLoad()
    intialTodosRender()
  } else if (e.target.classList.contains('projects-link')) {
    renderProjects(
      todoBtnClickOnProject,
      handleProjectTodoEditClick,
      handleProjectTodoDeleteClick,
      handleProjectDeleteClick
    )
    initialProjectsRender()
  }
})
