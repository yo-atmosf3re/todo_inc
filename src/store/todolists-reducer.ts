import { setStatusAC, SetStatusActionType, setErrorAC, setSwitchLinearAC, RequestStatusType } from './app-reducer';
import { todolistsAPI } from './../api/todolists-API';
import { v1 } from "uuid"
import { TodolistType } from "../api/todolists-API"
import { Dispatch } from 'redux';
import { dowloadProcessHandler, uploadFailureHandler } from '../utils/error-utils';

export type RemoveTodolistActionType = {
   type: 'REMOVE-TODOLIST'
   id: string
}
export type AddTodolistActionType = {
   type: 'ADD-TODOLIST'
   todolist: TodolistType
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
   type: 'SET-TODOLISTS'
   todolists: Array<TodolistType>
}
export type ChangeTodolistEntityStatusAT = {
   type: 'CHANGE-ENTITY-STATUS'
   entityStatus: RequestStatusType
   todolistId: string
}
export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
   entityStatus: RequestStatusType
}

export type ActionsTodolistsReducerType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodosActionType | SetStatusActionType
   | ChangeTodolistEntityStatusAT

export const todolistTheId1 = v1();
export const todolistTheId2 = v1();

const initialState: Array<TodolistDomainType> = [
   // { id: todolistTheId1, title: 'What to learn?', filter: 'all' },
   // { id: todolistTheId2, title: 'What to buy?', filter: 'all' },
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTodolistsReducerType): Array<TodolistDomainType> => {
   switch (action.type) {
      case "REMOVE-TODOLIST": {
         return [...state.filter(tl => tl.id !== action.id)]
      }
      case 'ADD-TODOLIST': return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
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
            ...t,
            filter: 'all',
            entityStatus: 'idle'
         }))
      }
      case 'CHANGE-ENTITY-STATUS': {
         const stateCopy = [...state]
         const todolist = stateCopy.find(f => f.id === action.todolistId)
         if (todolist) todolist.entityStatus = action.entityStatus
         return stateCopy
      }
      default:
         return state;
   }
}

// todo ----------------------------

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({ type: 'REMOVE-TODOLIST', id: todolistId })

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => ({ type: 'ADD-TODOLIST', todolist })

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => ({ type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title })

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({ type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter })

export const setTodosAC = (todolists: Array<TodolistType>): SetTodosActionType => ({ type: 'SET-TODOLISTS', todolists })

export const changeTodolistEntityStatusAC = (entityStatus: RequestStatusType, todolistId: string): ChangeTodolistEntityStatusAT => ({ type: 'CHANGE-ENTITY-STATUS', entityStatus, todolistId })

// todo ----------------------------

// ** Запрос всех тудулистов;
export const fetchTodolistsTC = () => async (dispatch: Dispatch<ActionsTodolistsReducerType>) => {
   const { data } = await todolistsAPI.getTodolists()
   try {
      dispatch(setTodosAC(data))
      dispatch(setStatusAC('succeeded'))
   } catch (error) {
      dispatch(setStatusAC('failed'))
      console.log(error)
   }
}

// ** Удаление тудулиста;
export const deleteTodolistTC = (todolistId: string) => async (dispatch: Dispatch) => {
   dowloadProcessHandler(dispatch, todolistId, 'before')
   const { data } = await todolistsAPI.deleteTodolist(todolistId)
   try {
      dispatch(removeTodolistAC(todolistId))
      dowloadProcessHandler(dispatch, todolistId, 'after')
   } catch (error) {
      uploadFailureHandler(dispatch, data.messages[0])
      console.log(error)
   }
}

// ** Изменение названия тудулиста;
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => async (dispatch: Dispatch) => {
   dowloadProcessHandler(dispatch, todolistId, 'before')
   const { data } = await todolistsAPI.updateTodolist(todolistId, newTitle)
   try {
      dispatch(changeTodolistTitleAC(todolistId, newTitle))
      dowloadProcessHandler(dispatch, todolistId, 'after')
   } catch (error) {
      console.log(error)
      uploadFailureHandler(dispatch, data.messages[0])
   }
}

// ** Создание тудулиста;
export const createTodolistTC = (title: string) => async (dispatch: Dispatch) => {
   const { data } = await todolistsAPI.createTodolist(title)
   dowloadProcessHandler(dispatch, data.data.item.id, 'before')
   try {
      dispatch(addTodolistAC(data.data.item))
      dowloadProcessHandler(dispatch, data.data.item.id, 'after')
   } catch (error) {
      console.log(error)
      uploadFailureHandler(dispatch, data.messages[0])
   }
}