import './styles.css'
import { createTodo } from './modules/todo'
import { removeTodo } from './modules/todoManger'

console.log('hellow world')

let todos = []

const myTodo = createTodo('walking', 'walk today evening at 4:00 pm', 'medium')
todos.push(myTodo)
console.log(todos);

todos = removeTodo(todos, todos[0].id)
console.log(todos);
