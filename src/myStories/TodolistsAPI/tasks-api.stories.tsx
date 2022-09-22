import axios from 'axios'
import React, { DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from 'react'
import { todolistsAPI } from '../../api/todolists-API'

export default {
   title: 'tasks-API'
}

export const GetTasks = () => {
   const [todolistId, setTodolistId] = useState('')
   const [state, setState] = useState<any>(null)
   const getTask = () => {
      todolistsAPI.getTasks(todolistId)
         .then((res) => {
            setState(res.data)
         })
   }
   return <div>{JSON.stringify(state)}
      <div>
         <input placeholder='todolistId' value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} />
         <button onClick={getTask}>Get tasks</button>
      </div>
   </div>
}
export const DeleteTasks = () => {
   const [state, setState] = useState<any>(null)
   const [todolistId, setTodolistId] = useState('')
   const [taskId, setTaskId] = useState('')
   const deleteTask = () => {
      todolistsAPI.deleteTasks(todolistId, taskId)
         .then((res) => {
            setState(res.data)
         })
   }


   return <div>
      <div>{JSON.stringify(state)}</div>
      <input placeholder='todolistId' value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} />
      <input placeholder='taskId' value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} />
      <button onClick={deleteTask}>Delete task</button>
   </div>
}
export const CreateTasks = () => {
   const [state, setState] = useState<any>(null)
   const [todolistId, setTodolistId] = useState('')
   const [taskTitle, setTaskTitle] = useState('')
   const createTask = () => {
      todolistsAPI.createTasks(todolistId, taskTitle)
         .then((res) => {
            setState(res.data)
         })
   }


   return <div>
      <div>{JSON.stringify(state)}</div>
      <input placeholder='TodolistId' value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} />
      <input placeholder='Task title' value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)} />
      <button onClick={createTask}>Create task</button>
   </div>
}
export const UpdateTasks = () => {
   const [state, setState] = useState<any>(null)
   const [todolistId, setTodolistId] = useState('')
   const [taskId, setTaskId] = useState('')
   const updateTasks = () => {
      const todolistId = '034ecc54-7b58-495e-9576-bfce42f3b131'
      todolistsAPI.updateTasks(todolistId, taskId, { title: 'New tasks', completed: true, deadline: 'deadline field', description: 'something desc', priority: 3, startDate: '18.08.1998', status: 5 })
         .then((res) => {
            setState(res.data)
         })
   }
   return <div>
      <div>{JSON.stringify(state)}</div>
      <input placeholder='todolistId' value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} />
      <input placeholder='taskId' value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} />
      <button onClick={updateTasks}>Update tasks</button>
   </div>
}