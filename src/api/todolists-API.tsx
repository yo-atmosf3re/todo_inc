import axios from "axios"
import { TodolistType, GetTasksResponseType, DeleteTasksResponseType, TaskType, UpdateTaskModelType, LoginParamType, ResponseLoginType, GetResponseLoginType } from "./api.types"

export type ResponseType<D = {}> = {
   resultCode: number
   messages: Array<string>
   data: D
}

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

// login: (data: LoginParamType) => instance.post<ResponseType<{ data: DataLoginType }>>('/auth/login', { data }),
// login: (data: LoginParamType) => instance.post<ResponseLoginType>('/auth/login', { data }),
export const authAPI = {
   login: (email: string, password: string, rememberMe: boolean) => instance.post<ResponseLoginType>('/auth/login', { email, password, rememberMe }),
   me: () => instance.get<GetResponseLoginType>('auth/me')
}

export const todolistsAPI = {
   getTodolists: () => instance.get<Array<TodolistType>>('todo-lists'),
   createTodolist: (title: string) => instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title }),
   deleteTodolist: (id: string) => instance.delete<ResponseType>(`todo-lists/${id}`),
   updateTodolist: (id: string, title: string) => instance.put<ResponseType>(`todo-lists/${id}`, { title }),
   getTasks: (todolistId: string) => instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`),
   deleteTasks: (todolistId: string, taskId: string) => instance.delete<DeleteTasksResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`),
   createTasks: (todolistId: string, taskTitle: string) => instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title: taskTitle }),
   updateTasks: (todolistId: string, taskId: string, model: UpdateTaskModelType) => instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model),
}