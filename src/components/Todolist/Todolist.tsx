import { Button, IconButton } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, } from 'react-redux';
import { AppDispatchType, AppRootStateType, } from '../../store/store';
import { fetchTasksTC } from '../../store/tasks-reducer';
import { TodolistPropsType } from './Todolist.types';
import { EditableSpan, AddItemForm, Task } from '..';
import { TaskStatuses } from '../../api/api.types';

export const Todolist: React.FC<TodolistPropsType> = React.memo(function ({
   addTask, changeFilter, changeStatus,
   changeTaskTitle, changeTodolistTitle, filter,
   id, removeTask, removeTodolist,
   title, tasks, entityStatus
}) {
   const dispatch = useDispatch<AppDispatchType>();

   useEffect(() => {
      dispatch(fetchTasksTC(id))
   }, [])

   const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id])
   const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id])
   const onComplitedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id])

   const removeTodolistHandler = useCallback(() => {
      removeTodolist(id)
   }, [removeTodolist, id])
   const changeTodolistTitleHandler = useCallback((newTitle: string) => {
      changeTodolistTitle(id, newTitle);
   }, [changeTodolistTitle, id])
   const addTaskHandler = useCallback((title: string) => {
      addTask(title, id)
   }, [addTask, id])

   let allTodolistTasks = tasks;
   let tasksForTodolist = allTodolistTasks;
   if (filter === 'active') {
      tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
   }
   if (filter === 'completed') {
      tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
   }

   const disableValue = entityStatus === 'loading'

   return (
      <div>
         <h3>
            <EditableSpan
               disable={disableValue}
               onChange={changeTodolistTitleHandler}
               title={title} />
            <IconButton
               onClick={removeTodolistHandler}
               disabled={disableValue}
            >
               <DeleteIcon />
            </IconButton>
            <AddItemForm
               disabled={disableValue}
               id={id}
               addItem={addTaskHandler}
            />
         </h3>
         <div>
            {
               tasksForTodolist.map(t =>
                  <Task
                     entityStatus={t.entityStatus}
                     task={t}
                     todolistId={id}
                     key={t.id}
                     addTask={addTask}
                     changeStatus={changeStatus}
                     changeTaskTitle={changeTaskTitle}
                     removeTask={removeTask}
                  />)
            }
         </div>
         <div>
            <Button
               variant={filter === 'all' ? 'contained' : 'text'}
               onClick={onAllClickHandler}>
               All
            </Button>
            <Button
               variant={filter === 'active' ? 'contained' : 'text'}
               onClick={onActiveClickHandler}>
               Active
            </Button>
            <Button
               color={'secondary'}
               variant={filter === 'completed' ? 'contained' : 'text'}
               onClick={onComplitedClickHandler}>
               Completed
            </Button>
         </div>
      </div >
   );
})