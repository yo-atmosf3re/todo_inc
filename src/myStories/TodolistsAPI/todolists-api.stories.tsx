import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default {
   title: 'API'
}

const settings = {
   withCredentials: true
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
         .then((res) => {
            setState(res.data)
         })
   }, [])

   // *
   // * 55:29
   // *

   return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
