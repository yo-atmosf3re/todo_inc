import { RequestStatusType } from "../store/app-reducer"

// Todolist API
export type TodolistType = {
   id: string
   title: string
   addedDate: string
   order: number
}
type CreateTodolistResponseType = {
   resultCode: number
   messages: Array<string>
   fieldsErrors: Array<string>
   data: {
      item: TodolistType
   }
}
export enum TaskStatuses {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3,
}
export enum TaskPriorities {
   Low = 0,
   Middle = 1,
   Hi = 2,
   Urgently = 3,
   Later = 4,
}
export type TaskType = {
   description: string
   title: string
   status: TaskStatuses
   priority: TaskPriorities
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string
   entityStatus: RequestStatusType
}
export type UpdateTaskModelType = {
   title: string
   description: string
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

// ! Auth API
export type LoginParamType = {
   email: string
   password: string
   rememberMe: boolean
}
export type DataLoginType = {
   userId: number
}
export interface ResponseLoginType {
   resultCode: number
   messages: string[]
   fieldsErrors: string[]
   data: DataLoginType
}
export type GetResponseLoginType = {
   data: {
      id: number
      email: string
      login: string
   }
   resultCode: number
   messages: string[]
} 
