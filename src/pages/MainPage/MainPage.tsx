import { Container, Grid, Paper } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v1 } from 'uuid'
import { TaskStatuses } from '../../api/todolists-API'
import { TasksStateType, FilterValuesType } from '../../App.types'
import { AddItemForm, Todolist } from '../../components'
import { AppReducerInitialStateType } from '../../store/app-reducer'
import { AppDispatchType, AppRootStateType } from '../../store/store'
import { removeTaskTC, createTasksTC, updateTaskStatusTC, updateTaskTitleAC } from '../../store/tasks-reducer'
import { TodolistDomainType, fetchTodolistsTC, changeTodolistFilterAC, deleteTodolistTC, changeTodolistTitleTC, createTodolistTC } from '../../store/todolists-reducer'

const PAPER_STYLE = { padding: '10px' }

export const MainPage = () => {
   const dispatch = useDispatch<AppDispatchType>();
   const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
   const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
   const { status } = useSelector<AppRootStateType, AppReducerInitialStateType>(state => state.app)

   useEffect(() => {
      dispatch(fetchTodolistsTC())
   }, [])

   // ! Если обернуть функцию с диспатчем в useCallback, то это правда помогает. Например: теперь, когда фильтруешь таски по приоритету, то вызываются коллбэки только для определенных тудулистов, и нет 100500 вызовов для всех тудулистов (это к вопросу о том "Зачем тут useCallback?" всё-таки);
   // ? Task's callback
   // const removeTask = useCallback((todolistId: string, id: string) => dispatch(removeTaskAC(id, todolistId)), [])
   // !
   const removeTask = useCallback((todolistId: string, taskId: string) => dispatch(removeTaskTC(todolistId, taskId)), [dispatch])
   // ** Старое
   // todo
   const addTask = useCallback((title: string, todolistId: string) => dispatch(createTasksTC(title, todolistId)), [dispatch])
   // ** Новое
   // const addTask = useCallback((task: TaskType) => dispatch(addTaskAC(task)), [dispatch])
   // const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => dispatch(changeStatusTaskAC(taskId, status, todolistId)), [dispatch])
   // !
   const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => dispatch(updateTaskStatusTC(taskId, status, todolistId)), [dispatch])
   // !
   const changeTaskTitles = useCallback((taskId: string, newTitle: string, todolistId: string) => dispatch(updateTaskTitleAC(taskId, newTitle, todolistId)), [dispatch])
   // const changeTaskTitles = useCallback((taskId: string, newTitle: string, todolistId: string) => dispatch(changeTaskTitleAC(taskId, newTitle, todolistId)), [dispatch])

   // Todolist's callback
   const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(todolistId, value))
   }, [dispatch])
   // !
   const removeTodolist = useCallback((todolistId: string) => {
      dispatch(deleteTodolistTC(todolistId))
   }, [dispatch])
   // !
   const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
      // dispatch(changeTodolistTitleAC(todolistId, newTitle))
      dispatch(changeTodolistTitleTC(todolistId, newTitle))
   }, [dispatch])
   // !
   const addTodolist = useCallback((title: string) => {
      dispatch(createTodolistTC(title))
   }, [dispatch])
   return (
      <Container fixed>
         <Grid
            container
            // xs={8}
            margin={'20px 0'}>
            <Grid item>
               <AddItemForm
                  addItem={addTodolist}
                  id={v1()}
               />
            </Grid>
         </Grid>
         <Grid
            container
            spacing={4}>
            {
               todolists.map(tl => {
                  const currentTasks = tasks[tl.id]
                  return <Grid
                     key={tl.id}
                     item>
                     <Paper
                        elevation={1}
                        style={PAPER_STYLE}>
                        <Todolist
                           entityStatus={tl.entityStatus}
                           tasks={currentTasks}
                           removeTask={removeTask}
                           addTask={addTask}
                           changeStatus={changeStatus}
                           changeTaskTitle={changeTaskTitles}
                           changeTodolistTitle={changeTodolistTitle}
                           key={tl.id}
                           id={tl.id}
                           title={tl.title}
                           changeFilter={changeFilter}
                           filter={tl.filter}
                           removeTodolist={removeTodolist} />
                     </Paper>
                  </Grid>
               })
            }
         </Grid>
      </Container>
   )
}