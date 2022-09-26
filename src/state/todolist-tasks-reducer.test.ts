import { tasksReducer } from './tasks-reducer';
import { addTodolistAC, todolistsReducer, TodolistDomainType } from './todolists-reducer';
import { TasksStateType, TodolistTypes } from './../App';
test.skip("Id's should be equals", () => {
   const startTasksState: TasksStateType = {};
   const startTodolistsState: Array<TodolistDomainType> = [];

   const action = addTodolistAC('New todolist');

   const endTasksState = tasksReducer(startTasksState, action);
   const endTodolistsState = todolistsReducer(startTodolistsState, action);

   const keys = Object.keys(endTasksState);
   const idFromTasks = keys[0];
   const idFromTodolists = endTodolistsState[0].id;

   expect(idFromTasks).toBe(action.id);
   expect(idFromTodolists).toBe(action.id);
})