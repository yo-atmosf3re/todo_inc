import { TaskType, TaskStatuses } from "../../api/api.types"
import { FilterValuesType } from "../../App.types"
import { RequestStatusType } from "../../store/app-reducer"

export type TodolistPropsType = {
   title: string,
   changeFilter: (value: FilterValuesType, todolistId: string) => void
   filter: FilterValuesType
   id: string
   removeTodolist: (todolistId: string) => void
   changeTodolistTitle: (newTitle: string, id: string) => void
   removeTask: (id: string, todolistId: string) => void
   // ** Старое
   addTask: (title: string, todolistId: string) => void
   // ** Новое
   // addTask: (task: TaskType) => void
   tasks: TaskType[]
   changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
   entityStatus: RequestStatusType
}