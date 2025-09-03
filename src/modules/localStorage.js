export const setTodosToLocalStorage = function(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
}

export const getTodosFromLocalStorage = function () {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos === null){
        return [] 
    }
    return todos;
}

export const setProjectsToLocalStorage = function (projects) {
    localStorage.setItem("projects", JSON.stringify(projects))
}


export const getProjectsFromLocalStorage = function () {

    const projects = JSON.parse(localStorage.getItem("projects"))
    if(projects === null){
        return []
    }

    return projects
}