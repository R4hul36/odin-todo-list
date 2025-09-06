import { format } from "date-fns"
import { getProjectsFromLocalStorage, setProjectsToLocalStorage } from "./localStorage"

export const defaultProjects = function () {
    if (getProjectsFromLocalStorage().length === 0) {
    const dummyProjects = [
      {
        id: "p1",
        projectName: "Work",
        todos: [
          {
            id: "pt1",
            name: "Email client",
            description: "Send update about project status",
            priority: "Medium",
            date: format(new Date(), "yyyy-MM-dd"),
          },
        ],
      },
      {
        id: "p2",
        projectName: "Personal",
        todos: [
          {
            id: "pt2",
            name: "Call plumber",
            description: "Fix kitchen sink leak",
            priority: "High",
            date: format(new Date(new Date().setDate(new Date().getDate() + 5)), "yyyy-MM-dd"),
          },
        ],
      },
    ]
    setProjectsToLocalStorage(dummyProjects)
  }

}