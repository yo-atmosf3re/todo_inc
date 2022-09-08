import { Checkbox, IconButton } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useCallback } from 'react';
import { TaskType } from '../../Todolist';
import EditableSpan from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskPropsType = {
   task: TaskType
   todolistId: string
   removeTask: (id: string, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

const Task = React.memo((props: TaskPropsType) => {
   const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.removeTask, props.task.id, props.todolistId])
   const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
   }, [props.changeStatus, props.task.id, props.todolistId])
   const onTitleChangeHandler = useCallback((newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId)
   }, [])


   return (<div key={props.todolistId} className={props.task.isDone ? 'is-done' : ''}>
      <Checkbox onChange={onChangeHandler}
         checked={props.task.isDone} />
      <EditableSpan onChange={onTitleChangeHandler} title={props.task.title} />
      <IconButton onClick={onClickHandler}>
         <DeleteIcon fontSize="small" />
      </IconButton>
   </div>)
})

export default Task;