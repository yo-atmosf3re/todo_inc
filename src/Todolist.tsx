import { Button, IconButton } from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';
import EditableSpan from './components/EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { removeTaskAC, addTaskAC, changeStatusTaskAC, changeTaskTitleAC } from './store/tasks-reducer';
import Task from './components/Task/Task';
import { TaskStatuses, TaskType } from './api/todolists-API';
import { FilterValuesType } from './App.types';
import AddItemForm from './components/AddItemForm/AddItemForm';

export type PropsType = {
   title: string,
   changeFilter: (value: FilterValuesType, todolistId: string) => void
   filter: FilterValuesType
   id: string
   removeTodolist: (todolistId: string) => void
   changeTodolistTitle: (newTitle: string, id: string) => void
   removeTask: (id: string, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
   console.log('Todolist is called')
   const dispatch = useDispatch();
   const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);

   const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
   const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
   const onComplitedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

   const removeTodolist = useCallback(() => {
      props.removeTodolist(props.id)
   }, [props.removeTodolist, props.id])
   const changeTodolistTitle = useCallback((newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
   }, [props.changeTodolistTitle, props.id])
   const addTask = useCallback((title: string) => {
      dispatch(addTaskAC(title, props.id))
   }, [dispatch])

   let allTodolistTasks = tasks;
   let tasksForTodolist = allTodolistTasks;
   if (props.filter === 'active') {
      tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
   }
   if (props.filter === 'completed') {
      tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
   }

   return (
      <div>
         <h3><EditableSpan onChange={changeTodolistTitle} title={props.title} />
            <IconButton onClick={removeTodolist}>
               <DeleteIcon />
            </IconButton>
            <AddItemForm id={props.id} addItem={addTask} />
         </h3>
         <div>
            {tasksForTodolist.map(t => <Task
               task={t}
               todolistId={props.id}
               key={t.id}
               addTask={props.addTask}
               changeStatus={props.changeStatus}
               changeTaskTitle={props.changeTaskTitle}
               removeTask={props.removeTask} />
            )}
         </div>
         <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>Active</Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onComplitedClickHandler}>Completed</Button>
         </div>
      </div >
   );
})



