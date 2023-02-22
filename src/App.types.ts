import { TaskType } from "./api/api.types";

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistTypes = {
   id: string,
   title: string,
   filter: FilterValuesType,
}

export type TasksStateType = {
   [key: string]: Array<TaskType>
}