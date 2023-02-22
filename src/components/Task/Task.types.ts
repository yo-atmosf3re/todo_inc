import { TaskType, TaskStatuses } from '../../api/api.types';
import { RequestStatusType } from './../../store/app-reducer';

export type TaskPropsType = {
   task: TaskType
   todolistId: string
   removeTask: (id: string, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
   entityStatus: RequestStatusType
}