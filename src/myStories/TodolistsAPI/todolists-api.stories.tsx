import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../../api/todolists-API'

export default {
   title: 'API'
}

const settings = {
   withCredentials: true,
   headers: {
      "API-KEY": "4e3f5b5e-2baf-457b-9c14-722f665306af"
   }
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.getTodolists()
         .then((res) => {
            setState(res.data)
         })
   }, [])
   return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.createTodolist('New todolist which the created with refactored code')
         .then((res) => {
            setState(res.data)
         })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      const todolistId = 'd1eae069-dcd6-4c4d-a175-6a3c77b47266'
      todolistsAPI.deleteTodolist(todolistId)
         .then((res) => {
            setState(res.data)
         })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      const todolistId = 'd1eae069-dcd6-4c4d-a175-6a3c77b47266'
      axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {
         title: 'Test todolist title changed'
      }, settings)
         .then((res) => {
            setState(res.data)
         })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
