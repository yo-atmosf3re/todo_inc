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
   return <div>{JSON.stringify(state)}</div>
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
      const todolistId = 'aa30e3cc-902a-4355-a666-8ec633d286b8'
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
      const todolistId = '034ecc54-7b58-495e-9576-bfce42f3b131'
      todolistsAPI.updateTodolist(todolistId, 'Updating todolist which the refactoring code')
         .then((res) => {
            setState(res.data)
         })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
