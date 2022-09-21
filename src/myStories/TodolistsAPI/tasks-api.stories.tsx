import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../../api/todolists-API'

export default {
   title: 'tasks-API'
}
const settings = {
   withCredentials: true,
   headers: {
      "API-KEY": "4e3f5b5e-2baf-457b-9c14-722f665306af"
   }
}

export const GetTasks = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      const todolistId = '45771682-d2ff-4789-9044-60f53b8834f8';
      todolistsAPI.getTasks(todolistId)
         .then((res) => {
            setState(res.data)
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
   const [state, setState] = useState<any>(null)
   const [todolistId, setTodolistId] = useState('')
   const [taskId, setTaskId] = useState('')

   const deleteTask = () => {
      useEffect(() => {
         todolistsAPI.deleteTasks(todolistId, taskId)
            .then((res) => {
               setState(res.data)
            })
      }, [])
   }

   return <div>
      <div>{JSON.stringify(state)}</div>
      <input placeholder='todolistId' />
      <input placeholder='taskId' />
      <button onClick={deleteTask}>Delete task</button>
   </div>
}