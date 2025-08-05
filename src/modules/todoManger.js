

export const removeTodo = function (todos, id) {
    return todos.filter((todo) => todo.id !== id)
}

export const updateTodo = function (todos, id, todo) {
    const updatedTodo = todos.map((t) => {
        if(t.id === id) {
            return todo;
        }
        return t;
    })
    
    
    return updatedTodo;
}