import { Box, AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import AddItemForm from './components/AddItemForm/AddItemForm';
import { TaskType, Todolist } from './Todolist';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistTypes = {
    id: string,
    title: string,
    filter: FilterValuesType,
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasks({ ...tasksObj });
    }
    function addTask(title: string, todolistId: string) {
        let newTask = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({ ...tasksObj });
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
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
    let [todolists, setTodolists] = useState<Array<TodolistTypes>>([
        { id: todolistTheId1, title: 'What to learn?', filter: 'all' },
        { id: todolistTheId2, title: 'What to buy?', filter: 'all' },
    ]);
    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistTheId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Redux", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistTheId2]: [
            { id: v1(), title: "Bread", isDone: true },
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Book", isDone: false },
            { id: v1(), title: "Cigarettes", isDone: false },
            { id: v1(), title: "Food", isDone: false },
        ]
    })
    function addTodolist(title: string) {
        let todolist: TodolistTypes = {
            id: v1(),
            filter: 'all',
            title: title,
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App" >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar color='primary' position="relative">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 5 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                            Todolist
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
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
                                    <Todolist
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
                                        removeTodolist={removeTodolist} />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div >
    );
}

export default App;
