import {
    Box, AppBar, Toolbar,
    IconButton, Typography, Container,
    Grid, Paper, createTheme,
    ThemeProvider
} from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import './App.css';
import AddItemForm from './components/AddItemForm/AddItemForm';
import MenuIcon from '@mui/icons-material/Menu';
import { cyan } from '@mui/material/colors';
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    fetchTodolistsTC, FilterValuesType, removeTodolistAC,
    TodolistDomainType
} from './store/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, AppRootStateType } from './store/store';
import {
    removeTaskAC, addTaskAC, changeStatusTaskAC,
    changeTaskTitleAC,
    fetchTasksTC,
    removeTaskTC
} from './store/tasks-reducer';
import { Todolist } from './components/Todolist';
import { TaskStatuses } from './api/todolists-API';

// * MUI theme
const THEME = createTheme({
    palette: {
        primary: cyan,
        secondary: {
            main: '#80deea',
        },
    },
})

const PAPER_STYLE = { padding: '10px' }

export const AppWithRedux = () => {
    const dispatch = useDispatch<AppDispatchType>();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);

    // useEffect(() => {
    //     todolists.forEach(f => dispatch(fetchTasksTC(f.id)))
    // }, [todolists])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    // ! Если обернуть функцию с диспатчем в useCallback, то это правда помогает. Например: теперь, когда фильтруешь таски по приоритету, то вызываются коллбэки только для определенных тудулистов, и нет 100500 вызовов для всех тудулистов (это к вопросу о том "Зачем тут useCallback?" всё-таки);
    // ? Task's callback
    // const removeTask = useCallback((todolistId: string, id: string) => dispatch(removeTaskAC(id, todolistId)), [])
    const removeTask = useCallback((todolistId: string, taskId: string) => dispatch(removeTaskTC(todolistId, taskId)), [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => dispatch(addTaskAC(title, todolistId)), [dispatch])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => dispatch(changeStatusTaskAC(taskId, status, todolistId)), [dispatch])
    const changeTaskTitles = useCallback((taskId: string, newTitle: string, todolistId: string) => dispatch(changeTaskTitleAC(taskId, newTitle, todolistId)), [dispatch])

    // Todolist's callback
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])
    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div >
            <ThemeProvider theme={THEME}>
                <Box sx={{ flexGrow: 2 }}>
                    <AppBar
                        color='primary'
                        position="relative">
                        <Toolbar>
                            <IconButton
                                size="medium"
                                edge="start"
                                color="default"
                                sx={{ mr: 5 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{ flexGrow: 1 }}>
                                Todolist
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Container fixed>
                    <Grid
                        container
                        // xs={8}
                        margin={'20px 0'}>
                        <Grid item>
                            <AddItemForm
                                addItem={addTodolist}
                                id={'Hello'} />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={4}>
                        {
                            todolists.map((tl) =>
                                <Grid
                                    key={tl.id}
                                    item>
                                    <Paper
                                        elevation={1}
                                        style={PAPER_STYLE}>
                                        <Todolist
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
                                </Grid>)
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        </div >
    );
}