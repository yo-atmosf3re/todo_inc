import { v1 } from "uuid"
import { FilterValuesType, TodolistTypes } from "../App"

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'

export type RemoveTodolistActionType = {
   type: 'REMOVE-TODOLIST'
   id: string
}
export type AddTodolistActionType = {
   type: 'ADD-TODOLIST'
   title: string
   id: string
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

export let todolistTheId1 = v1(); export let todolistTheId2 = v1();

const initialState: Array<TodolistTypes> = [
   { id: todolistTheId1, title: 'What to learn?', filter: 'all' },
   { id: todolistTheId2, title: 'What to buy?', filter: 'all' },
]

export const todolistsReducer = (state: Array<TodolistTypes> = initialState, action: ActionsType): Array<TodolistTypes> => {
   switch (action.type) {
      case REMOVE_TODOLIST: {
         return state.filter(tl => tl.id !== action.id)
      }
      case 'ADD-TODOLIST': {
         return [{
            id: action.id,
            filter: 'all',
            title: action.title,
         }, ...state,]
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
         return state;
   }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({ type: 'REMOVE-TODOLIST', id: todolistId })

export const addTodolistAC = (title: string): AddTodolistActionType => ({ type: 'ADD-TODOLIST', title, id: v1() })

export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => ({ type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title })

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({ type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter })

