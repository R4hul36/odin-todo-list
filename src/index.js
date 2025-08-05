import './styles.css'
import { createTodo } from './modules/todo'
import { createProject } from './modules/project'
import { removeTodo, updateTodo } from './modules/todoManger'

console.log('hellow world')

let todos = []
let projects = []

const myTodo = createTodo(
  'walking',
  'walk today evening at 4:00 pm',
  'medium',
  '2025, 8, 7'
)
todos.push(myTodo)
console.log(todos)

todos = updateTodo(
  todos,
  todos[0].id,
  createTodo('Running', 'Run for 30 minutes', 'important', '2025, 8, 11')
)

const myProject = createProject('study Math', '2 hours of math')
projects.push(myProject)
console.log(projects)
