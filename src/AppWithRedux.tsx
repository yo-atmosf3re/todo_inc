import { Box, AppBar, Toolbar, IconButton, Typography, Container, Grid, Paper, createTheme, ThemeProvider } from '@mui/material';
import React, { useCallback } from 'react';
import './App.css';
import AddItemForm from './components/AddItemForm/AddItemForm';
import { TaskType, Todolist } from './Todolist';
import MenuIcon from '@mui/icons-material/Menu';
import { cyan } from '@mui/material/colors';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistTypes = {
    id: string,
    title: string,
    filter: FilterValuesType,
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log("App is called")
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistTypes>>(state => state.todolists);


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

    // * MUI theme
    const theme = createTheme({
        palette: {
            primary: cyan,
            secondary: {
                main: '#80deea',
            },
        },
    })

    return (
        <div >
            <ThemeProvider theme={theme}>
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

export default AppWithRedux;
