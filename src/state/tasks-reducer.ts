import { v1 } from "uuid"
import { FilterValuesType, TasksStateType, TodolistTypes } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"

export type RemoveTaskActionType = {
   type: 'REMOVE-TASK'
   todolistId: string
   taskId: string
}
export type AddTaskActionType = {
   type: 'ADD-TASK'
   title: string
   todolistId: string
}
export type ChangeStatusActionType = {
   type: 'CHANGE-STATUS-TASK'
   taskId: string
   isDone: boolean
   todolistId: string
}
export type ChangeTaskTitleActionType = {
   type: 'CHANGE-TASK-TITLE'
   taskId: string
   newTitle: string
   todolistId: string
}


export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         const stateCopy = { ...state }
         const tasks = state[action.todolistId];
         const filteredTasks = tasks.filter(t => t.id !== action.taskId);
         stateCopy[action.todolistId] = filteredTasks;
         return stateCopy;
      }
      case 'ADD-TASK': {
         let stateCopy = { ...state }
         let newTask = { id: v1(), title: action.title, isDone: false };
         let tasks = stateCopy[action.todolistId];
         let newTasks = [newTask, ...tasks];
         stateCopy[action.todolistId] = newTasks;
         return stateCopy;
      }
      case 'CHANGE-STATUS-TASK': {
         let stateCopy = { ...state }
         let tasks = stateCopy[action.todolistId];
         let task = tasks.find(t => t.id === action.taskId)
         if (task) {
            task.isDone = action.isDone;
         }
         return stateCopy
      }
      case 'CHANGE-TASK-TITLE': {
         let stateCopy = { ...state }
         let tasks = stateCopy[action.todolistId];
         let task = tasks.find(t => t.id === action.taskId)
         if (task) {
            task.title = action.newTitle;
         }
         return stateCopy;
      }
      case 'ADD-TODOLIST': {
         let stateCopy = { ...state };
         stateCopy[action.id] = [];
         return stateCopy;
      }
      case 'REMOVE-TODOLIST': {
         const stateCopy = { ...state };
         delete stateCopy[action.id];
         return stateCopy;

      }
      default:
         return state;
   }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
   return { type: 'REMOVE-TASK', todolistId, taskId, }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
   return { type: 'ADD-TASK', title: title, todolistId: todolistId }
}
export const changeStatusTaskAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusActionType => {
   return { type: 'CHANGE-STATUS-TASK', taskId: taskId, isDone: isDone, todolistId: todolistId }
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
   return { type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId }
}

