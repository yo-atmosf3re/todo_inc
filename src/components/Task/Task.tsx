import { Checkbox, IconButton } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useCallback, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskStatuses } from '../../api/todolists-API';
import { TaskPropsType } from './Task.types';
import { EditableSpan } from '..';
import { removeTaskTC } from '../../store/tasks-reducer';
import { useDispatch } from 'react-redux';
import { AppDispatchType, AppRootStateType } from '../../store/store';
import { useSelector } from 'react-redux';
import { TasksStateType } from '../../App.types';

export const Task: React.FC<TaskPropsType> = React.memo(({
   addTask,
   changeStatus, changeTaskTitle,
   removeTask, task, todolistId
}) => {
   const dispatch = useDispatch<AppDispatchType>()

   const onClickRemoveHandler = useCallback(() => dispatch(removeTaskTC(todolistId, task.id)), [removeTask, task.id, todolistId])

   const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const newIsDoneValue = e.currentTarget.checked;
      changeStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
   }, [changeStatus, task.id, todolistId])

   const onTitleChangeHandler = useCallback((newValue: string) => {
      changeTaskTitle(task.id, newValue, todolistId)
   }, [changeTaskTitle, task.id, todolistId])

   const classNameTaskCondition = task.status === TaskStatuses.Completed ? 'is-done' : ''

   const { } = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

   console.log(task.entityStatus)

   return (
      <div
         key={todolistId}
         className={classNameTaskCondition}>
         <Checkbox
            onChange={onChangeHandler}
            checked={task.status === TaskStatuses.Completed}
         />
         <EditableSpan
            onChange={onTitleChangeHandler}
            title={task.title}
         />
         <IconButton onClick={onClickRemoveHandler}>
            <DeleteIcon fontSize="small" />
         </IconButton>
      </div>)
})