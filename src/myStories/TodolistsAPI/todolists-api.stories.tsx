import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../../api/todolists-API'

export default {
   title: 'todolists-API'
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
   const [title, setTitle] = useState('')
   const createTodolists = () => {
      useEffect(() => {
         todolistsAPI.createTodolist('New todolist which the created with refactored code')
            .then((res) => {
               setState(res.data)
            })
      }, [])
   }
   return <div>
      <div>{JSON.stringify(state)}</div>
      <input placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      <button onClick={createTodolists}>Create todolist</button>
   </div>
}
export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   const [todolistId, setTodolistId] = useState('')
   const deleteTodolist = () => {
      useEffect(() => {
         const todolistId = 'aa30e3cc-902a-4355-a666-8ec633d286b8'
         todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
               setState(res.data)
            })
      }, [])
   }
   return <div>
      <div>{JSON.stringify(state)}</div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} />
      <button onClick={deleteTodolist}>Delete todolist</button>
   </div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   const [title, setTitle] = useState('')
   const [todolistId, setTodolistId] = useState('')
   const updateTodolistTitle = () => {
      useEffect(() => {
         const todolistId = '034ecc54-7b58-495e-9576-bfce42f3b131'
         todolistsAPI.updateTodolist(todolistId, 'Updating todolist which the refactoring code')
            .then((res) => {
               setState(res.data)
            })
      }, [])
   }

   return <div>
      <div>{JSON.stringify(state)}</div>
      <input placeholder='todolistId' value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} />
      <input placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      <button onClick={updateTodolistTitle}>Update todolist title</button>
   </div>
}
