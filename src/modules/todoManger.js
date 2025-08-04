

export const removeTodo = function (todos, id) {
    return todos.filter((todo) => todo.id !== id)
}