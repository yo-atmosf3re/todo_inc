import { StringifyOptions } from 'querystring';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValuesType = 'all' | 'complited' | 'active';
export type TodolistTypes = {
    id: string,
    title: string,
    filter: FilterValuesType,
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

    let todolistTheId1 = v1(); let todolistTheId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistTypes>>([
        { id: todolistTheId1, title: 'What to learn?', filter: 'all' },
        { id: todolistTheId2, title: 'What to buy?', filter: 'complited' },
    ]);

    let [tasksObj, setTasks] = useState({
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

    return (
        <div className="App" >
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'complited') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    return <Todolist
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
                })
            }

        </div >
    );
}

export default App;
