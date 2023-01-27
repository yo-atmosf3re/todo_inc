import { Checkbox, IconButton } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskStatuses } from '../../api/todolists-API';
import { TaskPropsType } from './Task.types';
import { EditableSpan } from '..';




export const Task = React.memo((props: TaskPropsType) => {
   const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.removeTask, props.task.id, props.todolistId])

   const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      props.changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
   }, [props.changeStatus, props.task.id, props.todolistId])

   const onTitleChangeHandler = useCallback((newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId)
   }, [props.changeTaskTitle, props.task.id, props.todolistId])


   return (
      <div
         key={props.todolistId}
         className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
         <Checkbox onChange={onChangeHandler}
            checked={props.task.status === TaskStatuses.Completed} />
         <EditableSpan onChange={onTitleChangeHandler} title={props.task.title} />
         <IconButton onClick={onClickHandler}>
            <DeleteIcon fontSize="small" />
         </IconButton>
      </div>)
})