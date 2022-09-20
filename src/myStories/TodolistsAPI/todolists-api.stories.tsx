import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
      axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
         .then((res) => {
            setState(res.data)
         })
   }, [])
   return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {
         title: 'Test todolist'
      }, settings)
         .then((res) => {
            debugger
            setState(res.data)
         })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/742d37f2-2d27-4daf-869d-cc993642c56e', settings)
         .then((res) => {
            setState(res.data)
         })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {
         title: 'Test todolist'
      }, settings)
         .then((res) => {
            debugger
            setState(res.data)
         })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
