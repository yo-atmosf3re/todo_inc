import { TaskType } from "../../api/todolists-API"

export type AddItemFormPropsType = {
   addItem: (title: string) => void
   id: string
}