import axios from "axios"

const settings = {
   withCredentials: true,
   headers: {
      "API-KEY": "4e3f5b5e-2baf-457b-9c14-722f665306af"
   }
}

export const todolistsAPI = {
   getTodolists: () => axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings),
   createTodolist: (title: string) => axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', { title }, settings),
   deleteTodolist: (id: string) => axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings),
   updateTodolist: (id: string, title: string) => axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, { title }, settings),
}