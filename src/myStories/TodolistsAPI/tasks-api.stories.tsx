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
   const [todoListId, setTodoListId] = useState('')
   const [taskId, setTaskId] = useState('')
   const [state, setState] = useState<any>(null)
   const [title, setTitle] = useState<string>('title 1')
   const [description, setDescription] = useState<string>('description 1')
   const [completed, setCompleted] = useState<string>('')
   const [status, setStatus] = useState<number>(0)
   const [startDate, setStartDate] = useState<string>('')
   const [deadline, setDeadline] = useState<string>('')
   const [priority, setPriority] = useState<number>(0)
   // const [id, setId] = useState<string>('')
   // const [todoListId, setTodoListId] = useState<string>('')
   // const [order, setOrder] = useState('')
   // const [addedDate, setAddedDate] = useState<string>('')
   const updateTasks = () => {
      todolistsAPI.updateTasks(todoListId, taskId, { title: title, deadline: deadline, description: description, priority: priority, startDate: startDate, status: status })
         .then((res) => {
            setState(res.data)
         })
   }
   return <div>
      <div>{JSON.stringify(state)}</div>
      <input placeholder='todolistId' value={todoListId} onChange={(e) => setTodoListId(e.currentTarget.value)} />
      <input placeholder='taskId' value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} />
      <input placeholder='Title' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      <input placeholder='Description' value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
      {/* <input placeholder='Completed' value={completed} type={'checkbox'} onChange={(e) => setCompleted(e.currentTarget.value)} /> */}
      <input placeholder='Status' value={status} type={'number'} onChange={(e) => setStatus(+e.currentTarget.value)} />
      {/* <input placeholder='Start date' value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)} /> */}
      {/* <input placeholder='Deadline' value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)} /> */}
      <input placeholder='Priority' value={priority} type={'number'} onChange={(e) => setPriority(+e.currentTarget.value)} />
      <button onClick={updateTasks}>Update tasks</button>
   </div>
}