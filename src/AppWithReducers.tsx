import { Box, AppBar, Toolbar, IconButton, Typography, Container, Grid, Paper, createTheme, ThemeProvider } from '@mui/material';
import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import './App.css';
import AddItemForm from './components/AddItemForm/AddItemForm';
import { Todolist } from './Todolist';
import MenuIcon from '@mui/icons-material/Menu';
import { cyan } from '@mui/material/colors';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeStatusTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { TaskPriorities, TaskStatuses, TaskType } from './api/todolists-API';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistTheId1 = v1(); let todolistTheId2 = v1();
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        { id: todolistTheId1, title: 'What to learn?' },
        { id: todolistTheId2, title: 'What to buy?' },
    ]);
    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistTheId1]: [
            { id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todolistId: todolistTheId1, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: v1(), title: "JS", status: TaskStatuses.Completed, todolistId: todolistTheId1, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: v1(), title: "ReactJS", status: TaskStatuses.Completed, todolistId: todolistTheId1, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: v1(), title: "Redux", status: TaskStatuses.Completed, todolistId: todolistTheId1, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: v1(), title: "GraphQL", status: TaskStatuses.Completed, todolistId: todolistTheId1, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        ],
        [todolistTheId2]: [
            { id: v1(), title: "Bread", status: TaskStatuses.Completed, todolistId: todolistTheId2, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: v1(), title: "Milk", status: TaskStatuses.Completed, todolistId: todolistTheId2, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: v1(), title: "Book", status: TaskStatuses.Completed, todolistId: todolistTheId2, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: v1(), title: "Cigarettes", status: TaskStatuses.Completed, todolistId: todolistTheId2, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: v1(), title: "Food", status: TaskStatuses.Completed, todolistId: todolistTheId2, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        ]
    })

    // Task's callback
    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeStatusTaskAC(taskId, isDone, todolistId))
    }
    function changeTaskTitles(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId));
    }

    // Todolist's callback
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value))
    }
    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }
    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id, newTitle))
    }
    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    // MUI theme
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
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                                }
                                if (tl.filter === 'active') {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                                }
                                return <Grid item>
                                    <Paper elevation={1} style={{ padding: '10px' }}>
                                        {/* <Todolist
                                            changeTodolistTitle={changeTodolistTitle}
                                            changeTaskTitle={changeTaskTitles}
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist} /> */}
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

export default AppWithReducers;
