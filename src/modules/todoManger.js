// let todos = []

export const getTodos = function (todos) {
  return todos
}

export const setTodos = function (todos, todo) {
  return [...todos, todo]
}
 
export const removeTodo = function (todos, id) {
  return todos.filter((todo) => todo.id !== id)
    
}

export const updateTodo = function (todos, id, todo) {
  return todos.map((t) => {
    if (t.id === id) {
      return todo
    }
    return t
  })
 
}
