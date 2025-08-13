const projects = []

export const getProjects = function () {
    console.log("gettt");
    return projects;
       
}

export const setProjects = function (project) {
    console.log("settt");
    projects.push(project)
}