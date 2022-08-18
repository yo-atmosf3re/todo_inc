import { v1 } from "uuid"
import { TodolistTypes } from "../App"


export type ActionType = {
   type: string
   [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistTypes>, action: ActionType): Array<TodolistTypes> => {
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
      default:
         throw new Error("I don't understand this type")
   }
}