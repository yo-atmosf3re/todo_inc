import axios from "axios"

const settings = {
   withCredentials: true,
   headers: {
      "API-KEY": "4e3f5b5e-2baf-457b-9c14-722f665306af"
   }
}

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
type DeleteTodolistResponseType = {
   resultCode: number
   messages: Array<string>
   fieldsErrors: Array<string>
   data: {}
}
type UpdateTodolistResponseType = {
   resultCode: number
   messages: Array<string>
   fieldsErrors: Array<string>
   data: {}
}




export const todolistsAPI = {
   getTodolists: () => axios.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings),
   createTodolist: (title: string) => axios.post<CreateTodolistResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists', { title }, settings),
   deleteTodolist: (id: string) => axios.delete<DeleteTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings),
   updateTodolist: (id: string, title: string) => axios.put<UpdateTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, { title }, settings),
}