import { v1 } from "uuid"
import { FilterValuesType, TodolistTypes } from "../App"

export type RemoveTodolistActionType = {
   type: 'REMOVE-TODOLIST'
   id: string
}
export type AddTodolistActionType = {
   type: 'ADD-TODOLIST'
   title: string
}
export type ChangeTodolistTitleActionType = {
   type: 'CHANGE-TODOLIST-TITLE'
   title: string
   id: string
}
export type ChangeTodolistFilterActionType = {
   type: 'CHANGE-TODOLIST-FILTER'
   filter: FilterValuesType
   id: string
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistTypes>, action: ActionsType): Array<TodolistTypes> => {
   switch (action.type) {
      case 'REMOVE-TODOLIST': {
         return state.filter(tl => tl.id !== action.id)
      }
      case 'ADD-TODOLIST': {
         return [...state, {
            id: v1(),
            filter: 'all',
            title: action.title,
         }]
      }
      case 'CHANGE-TODOLIST-TITLE': {
         const todolist = state.find(tl => tl.id === action.id)
         if (todolist) {
            todolist.title = action.title;
         }
         return [...state];
      }
      case 'CHANGE-TODOLIST-FILTER': {
         let todolist = state.find(tl => tl.id == action.id)
         if (todolist) {
            todolist.filter = action.filter;
         }
         return [...state];
      }
      default:
         throw new Error("I don't understand this type")
   }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
   return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
   return { type: 'ADD-TODOLIST', title: title }
}
export const ChangeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
   return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title }
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
   return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter }
}