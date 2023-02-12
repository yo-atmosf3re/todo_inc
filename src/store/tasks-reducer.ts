import { AppRootStateType } from './store';
import { TaskType, todolistsAPI } from './../api/todolists-API';
import { TaskPriorities, TaskStatuses } from '../api/todolists-API';
import { v1 } from "uuid"
import { TasksStateType } from "../App.types";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType, todolistTheId1, todolistTheId2 } from "./todolists-reducer"
import { Dispatch } from 'redux';
import { setStatusAC, setErrorAC, setSwitchLinearAC, RequestStatusType } from './app-reducer';

export type RemoveTaskActionType = {
   todolistId: string,
   taskId: string
   type: 'REMOVE-TASK'
}
export type AddTaskActionType = {
   task: TaskType
   type: 'ADD-TASK'
}
export type ChangeStatusTaskActionType = {
   taskId: string
   status: TaskStatuses
   todolistId: string
   type: 'CHANGE-STATUS-TASK'
}
export type ChangeTaskTitleActionType = {
   taskId: string
   newTitle: string
   todolistId: string
   type: 'CHANGE-TASK-TITLE'
}
export type SetTasksActionType = {
   tasks: TaskType[]
   todolistId: string
   type: 'SET-TASKS'
}
export type SetEntityStatusTaskActionType = {
   type: 'SET-ENTITY-STATUS'
   todolistId: string
   taskId: string
   entityStatus: RequestStatusType
}

export type ActionsTasksReducerType =
   RemoveTaskActionType | AddTaskActionType | ChangeStatusTaskActionType |
   ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType |
   SetTodosActionType | SetTasksActionType | SetEntityStatusTaskActionType

const initialState: TasksStateType = {
   // [todolistTheId1]: [
   //    {
   //       id: v1(),
   //       title: "HTML&CSS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId1
   //    },
   //    {
   //       id: v1(), title: "JS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId1
   //    },
   //    {
   //       id: v1(), title: "ReactJS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId1
   //    },
   //    {
   //       id: v1(), title: "Redux", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId1
   //    },
   //    {
   //       id: v1(), title: "GraphQL", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId1
   //    },
   // ],
   // [todolistTheId2]: [
   //    { id: v1(), title: "Bread", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId2 },
   //    { id: v1(), title: "Milk", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId2 },
   //    { id: v1(), title: "Book", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId2 },
   //    { id: v1(), title: "Cigarettes", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId2 },
   //    { id: v1(), title: "Food", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId2 },
   // ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTasksReducerType): TasksStateType => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         const stateCopy = { ...state }
         const tasks = stateCopy[action.todolistId];
         const filteredTasks = tasks.filter(t => t.id !== action.taskId);
         stateCopy[action.todolistId] = filteredTasks;
         return stateCopy;
      }
      case 'ADD-TASK': {
         return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
      }
      case 'CHANGE-STATUS-TASK': {
         let todolistTasks = state[action.todolistId];
         state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? { ...t, status: action.status } : t);
         return ({ ...state })
      }
      case 'CHANGE-TASK-TITLE': {
         let todolistTasks = state[action.todolistId];
         state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? { ...t, title: action.newTitle } : t);
         return ({ ...state })
      }
      case 'ADD-TODOLIST': {
         return {
            ...state,
            [action.todolist.id]: []
         }
      }
      case 'REMOVE-TODOLIST': {
         const stateCopy = { ...state };
         delete stateCopy[action.id];
         return stateCopy;

      }
      case 'SET-TODOLISTS': {
         const stateCopy = { ...state }
         action.todolists.forEach((t) => {
            stateCopy[t.id] = []
         })
         return stateCopy;
      }
      case 'SET-TASKS': {
         const stateCopy = { ...state }
         stateCopy[action.todolistId] = action.tasks
         return stateCopy
      }
      case 'SET-ENTITY-STATUS': {
         let todolistTasks = state[action.todolistId];
         state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId
            ? { ...t, entityStatus: 'loading' }
            : t
         )
         return { ...state }
      }
      default:
         return state;
   }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => ({ type: 'REMOVE-TASK', todolistId, taskId, })

export const addTaskAC = (task: TaskType): AddTaskActionType => ({ type: 'ADD-TASK', task })

export const changeStatusTaskAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeStatusTaskActionType => ({ type: 'CHANGE-STATUS-TASK', taskId, status, todolistId })

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => ({ type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId })

export const setTasksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => ({ type: 'SET-TASKS', tasks, todolistId })

export const setStatusEntityAC = (taskId: string, todolistId: string, entityStatus: RequestStatusType): SetEntityStatusTaskActionType => ({ type: 'SET-ENTITY-STATUS', taskId, todolistId, entityStatus })

// ** Запрос всех тасок;
export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
   try {
      dispatch(setStatusAC('loading'))
      const { data } = await todolistsAPI.getTasks(todolistId)
      dispatch(setTasksAC(data.items, todolistId))
      dispatch(setStatusAC('succeeded'))
   } catch (error) {
      console.log(error)
      dispatch(setStatusAC('failed'))
   }
}

// ** Удаление таски;
export const removeTaskTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
   dispatch(setStatusEntityAC(taskId, todolistId, 'loading'))
   const { data } = await todolistsAPI.deleteTasks(todolistId, taskId)
   dispatch(setStatusAC('loading'))
   try {
      dispatch(removeTaskAC(todolistId, taskId))
      dispatch(setStatusAC('succeeded'))
   } catch (error) {
      console.log(error)
      dispatch(setStatusAC('failed'))
   }
}

// ** Создание новой таски;
export const createTasksTC = (title: string, todolistId: string) => async (dispatch: Dispatch) => {
   const { data } = await todolistsAPI.createTasks(todolistId, title)
   dispatch(setSwitchLinearAC(true))
   dispatch(setStatusAC('loading'))
   try {
      dispatch(addTaskAC(data.data.item))
      dispatch(setStatusAC('succeeded'))
      dispatch(setErrorAC('The change was successful!'))
   } catch (error) {
      console.log(error)
      dispatch(setStatusAC('failed'))
      dispatch(setErrorAC(data.messages[0]))
   }
}

// ** Обновление статуса у таски;
export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
   const allTasksFromState = getState().tasks;
   const tasksForCurrentTodolist = allTasksFromState[todolistId]
   const task = tasksForCurrentTodolist.find(t => t.id === taskId)
   if (task) {
      try {
         dispatch(setStatusAC('loading'))
         await todolistsAPI.updateTasks(todolistId, taskId, {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: status
         })
         dispatch(changeStatusTaskAC(taskId, status, todolistId))
         dispatch(setStatusAC('succeeded'))
      } catch (error) {
         console.log(error)
         dispatch(setStatusAC('failed'))
      }
   }
}

// ** Изменение названия таски;
export const updateTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
   const allTasksFromState = getState().tasks;
   const tasksForCurrentTodolist = allTasksFromState[todolistId]
   const task = tasksForCurrentTodolist.find(t => t.id === taskId)
   if (task) {
      try {
         dispatch(setStatusAC('loading'))
         await todolistsAPI.updateTasks(todolistId, taskId, {
            title: newTitle,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status
         })
         dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
         dispatch(setStatusAC('succeeded'))
      } catch (error) {
         console.log(error)
         dispatch(setStatusAC('failed'))
      }
   }
}