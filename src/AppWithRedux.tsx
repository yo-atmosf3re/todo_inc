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
    fetchTodolistsTC,
    FilterValuesType, removeTodolistAC, setTodosAC, TodolistDomainType
} from './store/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import {
    removeTaskAC, addTaskAC, changeStatusTaskAC,
    changeTaskTitleAC
} from './store/tasks-reducer';
import { Todolist } from './Todolist';
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

export const AppWithRedux = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    // ? Task's callback
    const removeTask = (todolistId: string, id: string) => dispatch(removeTaskAC(id, todolistId))
    const addTask = (title: string, todolistId: string) => dispatch(addTaskAC(title, todolistId))
    const changeStatus = (taskId: string, status: TaskStatuses, todolistId: string) => dispatch(changeStatusTaskAC(taskId, status, todolistId))
    const changeTaskTitles = (taskId: string, newTitle: string, todolistId: string) => dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))

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
                    <AppBar color='primary' position="relative">
                        <Toolbar>
                            <IconButton
                                size="medium"
                                edge="start"
                                color="default"
                                sx={{ mr: 5 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                                Todolist
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Container fixed>
                    <Grid container xs={8} margin={'20px 0'}>
                        <AddItemForm addItem={addTodolist} id={'Hello'} />
                    </Grid>
                    <Grid container spacing={4}>
                        {
                            todolists.map((tl) => {
                                return <Grid item>
                                    <Paper elevation={1} style={{ padding: '10px' }}>
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
                                </Grid>
                            })
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        </div >
    );
}