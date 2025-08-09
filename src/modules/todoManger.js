let todos = []

export const getTodos = function () {
  return todos
}

export const setTodos = function (todo) {
  todos.push(todo)
}

export const removeTodo = function (id) {
  todos = todos.filter((todo) => todo.id !== id)
}

export const updateTodo = function (todos, id, todo) {
  const updatedTodo = todos.map((t) => {
    if (t.id === id) {
      return todo
    }
    return t
  })

  return updatedTodo
}
