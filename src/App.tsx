import { Box, AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper, createTheme, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import AddItemForm from './components/AddItemForm/AddItemForm';
import { Todolist } from './Todolist';
import MenuIcon from '@mui/icons-material/Menu';
import { cyan } from '@mui/material/colors';
import { FilterValuesType, TodolistDomainType } from './store/todolists-reducer';
import { TaskPriorities, TaskStatuses } from './api/todolists-API';
import { TasksStateType } from './App.types';

function App() {
    console.log('App is called')
    // Task's callback's
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasks({ ...tasksObj });
    }
    function addTask(title: string, todolistId: string) {
        let newTask = { id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistId, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' };
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({ ...tasksObj });
    }
    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.status = status;
            setTasks({ ...tasksObj })
        }
        ;
    }
    function changeTaskTitles(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle;
            setTasks({ ...tasksObj })
        }
        ;
    }

    // Todolist's callback's
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id == todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks({ ...tasksObj });
    }
    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    let todolistTheId1 = v1(); let todolistTheId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        { id: todolistTheId1, title: 'What to learn?', filter: 'all', addedDate: '', order: 0, },
        { id: todolistTheId2, title: 'What to buy?', filter: 'all', addedDate: '', order: 0, },
    ]);
    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistTheId1]: [
            { id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistTheId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' },
            { id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistTheId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' },
            { id: v1(), title: "ReactJS", status: TaskStatuses.Completed, todoListId: todolistTheId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' },
            { id: v1(), title: "Redux", status: TaskStatuses.Completed, todoListId: todolistTheId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' },
            { id: v1(), title: "GraphQL", status: TaskStatuses.Completed, todoListId: todolistTheId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' },
        ],
        [todolistTheId2]: [
            { id: v1(), title: "Bread", status: TaskStatuses.Completed, todoListId: todolistTheId2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' },
            { id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistTheId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' },
            { id: v1(), title: "Book", status: TaskStatuses.Completed, todoListId: todolistTheId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' },
            { id: v1(), title: "Cigarettes", status: TaskStatuses.Completed, todoListId: todolistTheId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' },
            { id: v1(), title: "Food", status: TaskStatuses.Completed, todoListId: todolistTheId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '' },
        ]
    })

    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {
            id: v1(),
            filter: 'all',
            title: title,
            addedDate: '',
            order: 0,
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

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
                                let tasksForTodolist = tasksObj[tl.id];
                                if (tl.filter === 'completed') {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
                                }
                                if (tl.filter === 'active') {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
                                }
                                return <Grid item>
                                    <Paper elevation={1} style={{ padding: '10px' }}>
                                        <Todolist
                                            changeTodolistTitle={changeTodolistTitle}
                                            changeTaskTitle={changeTaskTitles}
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
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

export default App;
