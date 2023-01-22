import { todolistsAPI } from './../api/todolists-API';
import { v1 } from "uuid"
import { TodolistType } from "../api/todolists-API"
import { TodolistTypes } from "../App.types"
import { AnyAction, Dispatch } from 'redux';

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
export type SetTodosActionType = {
   todolists: Array<TodolistType>
   type: 'SET-TODOLISTS'
}
export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodosActionType

export const todolistTheId1 = v1();
export const todolistTheId2 = v1();

const initialState: Array<TodolistDomainType> = [
   // { id: todolistTheId1, title: 'What to learn?', filter: 'all' },
   // { id: todolistTheId2, title: 'What to buy?', filter: 'all' },
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
   switch (action.type) {
      case "REMOVE-TODOLIST": {
         return [...state.filter(tl => tl.id !== action.id)]
      }
      case 'ADD-TODOLIST': {
         return [{
            id: action.id,
            filter: 'all',
            title: action.title,
            addedDate: '',
            order: 0,
         }, ...state,]
      }
      case 'CHANGE-TODOLIST-TITLE': {
         const stateCopy = [...state]
         const todolist = stateCopy.find(tl => tl.id === action.id)
         if (todolist) {
            todolist.title = action.title;
         }
         return stateCopy;
      }
      case 'CHANGE-TODOLIST-FILTER': {
         let todolist = state.find(tl => tl.id == action.id)
         if (todolist) {
            todolist.filter = action.filter;
         }
         return [...state];
      }
      case 'SET-TODOLISTS': {
         return action.todolists.map(t => ({
            ...t, filter: 'all'
         }))
      }
      default:
         return state;
   }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({ type: 'REMOVE-TODOLIST', id: todolistId })

export const addTodolistAC = (title: string): AddTodolistActionType => ({ type: 'ADD-TODOLIST', title, id: v1() })

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => ({ type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title })

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({ type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter })

export const setTodosAC = (todolists: Array<TodolistType>): SetTodosActionType => ({ type: 'SET-TODOLISTS', todolists })

export const fetchTodolistsTC = () => (dispatch: Dispatch<SetTodosActionType>) =>
   todolistsAPI.getTodolists()
      .then(res => {
         dispatch(setTodosAC(res.data))
      })
