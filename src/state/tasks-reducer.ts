import { v1 } from "uuid"
import { FilterValuesType, TasksStateType, TodolistTypes } from "../App"

export type RemoveTaskActionType = {
   type: 'REMOVE-TASK'
   todolistId: string
   taskId: string
}
export type ActionType2 = {
   type: '2'
   title: string
}

export type ActionsType = RemoveTaskActionType | ActionType2
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         let stateCopy = { ...state }
         let tasks = state[action.todolistId];
         let filteredTasks = tasks.filter(t => t.id !== action.taskId)
         stateCopy[action.todolistId] = filteredTasks;
         return stateCopy;
      }
      case '2': {
         return { ...state }
      }
      default:
         throw new Error("I don't understand this type")
   }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
   return { type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId, }
}
export const action2AC = (title: string): ActionType2 => {
   return { type: '2', title: title }
}
// export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
//    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title }
// }
// export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
//    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter }
// }
