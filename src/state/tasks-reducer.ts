import { v1 } from "uuid"
import { TasksStateType } from "../AppWithRedux";
import { AddTodolistActionType, RemoveTodolistActionType, todolistTheId1, todolistTheId2 } from "./todolists-reducer"

export type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof changeStatusTaskAC> | ReturnType<typeof changeTaskTitleAC> | AddTodolistActionType | RemoveTodolistActionType;

const initialState: TasksStateType = {
   [todolistTheId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
   ],
   [todolistTheId2]: [
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Cigarettes", isDone: false },
      { id: v1(), title: "Food", isDone: false },
   ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         debugger
         // const stateCopy = { ...state }
         // const tasks = stateCopy[action.todolistId];
         // const filteredTasks = tasks.filter(t => t.id !== action.taskId);
         // stateCopy[action.todolistId] = filteredTasks;
         // return stateCopy;
         // let todolistTasks = state[action.todolistId];
         // state[action.todolistId] = todolistTasks.map(t => {
         //    if (t.id === action.taskId) {
         //       return t
         //    }
         // })
         // return ({ ...state })

         // todo ЧТО-ТО С ЭТИМ НУЖНО СДЕЛАТЬ, НЕ РАБОТАЕТ!
         return state;
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
         let todolistTasks = state[action.todolistId];
         state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? { ...t, isDone: action.isDone } : t);
         return ({ ...state })
      }
      case 'CHANGE-TASK-TITLE': {
         let todolistTasks = state[action.todolistId];
         state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? { ...t, title: action.newTitle } : t);
         return ({ ...state })
         // let todolistTasks = state[action.todolistId];
         // let task = todolistTasks.find(t => t.id === action.taskId);
         // if (task) {
         //    task.title = action.newTitle
         // }
         // state[action.todolistId] = [...todolistTasks]
         // return ({ ...state })
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
      default:
         return state;
   }
}

export const removeTaskAC = (todolistId: string, taskId: string) => ({ type: 'REMOVE-TASK', todolistId, taskId, } as const)

export const addTaskAC = (title: string, todolistId: string) => ({ type: 'ADD-TASK', title, todolistId } as const)

export const changeStatusTaskAC = (taskId: string, isDone: boolean, todolistId: string) => ({ type: 'CHANGE-STATUS-TASK', taskId, isDone, todolistId } as const)

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({ type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId } as const)


