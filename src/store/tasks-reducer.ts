import { TaskPriorities, TaskStatuses } from '../api/todolists-API';
import { v1 } from "uuid"
import { TasksStateType } from "../App.types";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType, todolistTheId1, todolistTheId2 } from "./todolists-reducer"

export type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof changeStatusTaskAC> | ReturnType<typeof changeTaskTitleAC> | AddTodolistActionType | RemoveTodolistActionType | SetTodosActionType;

const initialState: TasksStateType = {
   [todolistTheId1]: [
      { id: v1(), title: "HTML&CSS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId1 },
      { id: v1(), title: "JS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId1 },
      { id: v1(), title: "ReactJS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId1 },
      { id: v1(), title: "Redux", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId1 },
      { id: v1(), title: "GraphQL", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId1 },
   ],
   [todolistTheId2]: [
      { id: v1(), title: "Bread", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId2 },
      { id: v1(), title: "Milk", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId2 },
      { id: v1(), title: "Book", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId2 },
      { id: v1(), title: "Cigarettes", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId2 },
      { id: v1(), title: "Food", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: todolistTheId2 },
   ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         const stateCopy = { ...state }
         const tasks = stateCopy[action.todolistId];
         const filteredTasks = tasks.filter(t => t.id !== action.taskId);
         stateCopy[action.todolistId] = filteredTasks;
         return stateCopy;
      }
      case 'ADD-TASK': {
         let stateCopy = { ...state }
         let newTask = { id: v1(), title: action.title, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi, startDate: '', status: TaskStatuses.New, todoListId: action.todolistId };
         let tasks = stateCopy[action.todolistId];
         let newTasks = [newTask, ...tasks];
         stateCopy[action.todolistId] = newTasks;
         return stateCopy;
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
            [action.id]: []
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
      default:
         return state;
   }
}

export const removeTaskAC = (todolistId: string, taskId: string) => ({ type: 'REMOVE-TASK', todolistId, taskId, } as const)

export const addTaskAC = (title: string, todolistId: string) => ({ type: 'ADD-TASK', title, todolistId } as const)

export const changeStatusTaskAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({ type: 'CHANGE-STATUS-TASK', taskId, status, todolistId } as const)

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({ type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId } as const)


