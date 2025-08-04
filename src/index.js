import './styles.css'
import { createTodo } from './modules/todo'

console.log('hellow world')

const todos = []

const myTodo = createTodo('walking', 'walk today evening at 4:00 pm', 'medium')
todos.push(myTodo)
