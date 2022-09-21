import axios from "axios"

const settings = {
   withCredentials: true,
   headers: {
      "API-KEY": "4e3f5b5e-2baf-457b-9c14-722f665306af"
   }
}
const instance = axios.create({
   baseURL: `https://social-network.samuraijs.com/api/1.1/`,
   ...settings
})

export type TodolistType = {
   id: string
   title: string
   addedDate: string
   orded: number
}
type CreateTodolistResponseType = {
   resultCode: number
   messages: Array<string>
   fieldsErrors: Array<string>
   data: {
      item: TodolistType
   }
}
export type ResponseType<D = {}> = {
   resultCode: number
   messages: Array<string>
   data: D
}
export type TaskType = {
   description: string
   title: string
   completed: boolean
   status: number
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string
}
export type UpdateTaskType = {
   title: string
   description: string
   completed: boolean
   status: number
   priority: number
   startDate: string
   deadline: string
}
export type GetTasksResponseType = {
   totalCount: number
   error: null | string
   items: TaskType[]
}
export type DeleteTasksResponseType = {
   resultCode: number
   messages: Array<string>
   data: {}
}

export const todolistsAPI = {
   getTodolists: () => instance.get<Array<TodolistType>>('todo-lists'),
   createTodolist: (title: string) => instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title }),
   deleteTodolist: (id: string) => instance.delete<ResponseType>(`todo-lists/${id}`),
   updateTodolist: (id: string, title: string) => instance.put<ResponseType>(`todo-lists/${id}`, { title }),
   getTasks: (todolistId: string) => instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`),
   deleteTasks: (todolistId: string, taskId: string) => instance.delete<DeleteTasksResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`),
}