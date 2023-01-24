import { Button, IconButton } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import EditableSpan from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, AppRootStateType } from '../../store/store';
import { addTaskAC, fetchTasksTC } from '../../store/tasks-reducer';
import Task from '../Task/Task';
import { TaskStatuses, TaskType } from '../../api/todolists-API';
import AddItemForm from '../AddItemForm/AddItemForm';
import { TodolistPropsType } from './Todolist.types';

export const Todolist: React.FC<TodolistPropsType> = React.memo(function ({
   addTask, changeFilter, changeStatus,
   changeTaskTitle, changeTodolistTitle, filter,
   id, removeTask, removeTodolist,
   title
}) {
   // console.log('Todolist is called')
   const dispatch = useDispatch<AppDispatchType>();
   const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id]);

   useEffect(() => {
      dispatch(fetchTasksTC(id))
   }, [id])

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
      dispatch(addTaskAC(title, id))
   }, [dispatch])

   let allTodolistTasks = tasks;
   let tasksForTodolist = allTodolistTasks;
   if (filter === 'active') {
      tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
   }
   if (filter === 'completed') {
      tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
   }

   return (
      <div>
         <h3>
            <EditableSpan
               onChange={changeTodolistTitleHandler}
               title={title} />
            <IconButton onClick={removeTodolistHandler}>
               <DeleteIcon />
            </IconButton>
            <AddItemForm
               id={id}
               addItem={addTaskHandler} />
         </h3>
         <div>
            {
               tasksForTodolist.map(t =>
                  <Task
                     task={t}
                     todolistId={id}
                     key={t.id}
                     addTask={addTask}
                     changeStatus={changeStatus}
                     changeTaskTitle={changeTaskTitle}
                     removeTask={removeTask} />)
            }
         </div>
         <div>
            <Button variant={filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All</Button>
            <Button variant={filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>Active</Button>
            <Button color={'secondary'} variant={filter === 'completed' ? 'contained' : 'text'} onClick={onComplitedClickHandler}>Completed</Button>
         </div>
      </div >
   );
})