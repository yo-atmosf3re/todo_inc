import { removeTaskAC, tasksReducer, addTaskAC, changeStatusTaskAC, changeTaskTitleAC } from './tasks-reducer';
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';
import { TaskPriorities, TaskStatuses } from '../api/todolists-API';
import { TasksStateType } from '../App.types';

test.skip('correct task should be deleted from correct array', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ],
      "todolistId2": [
         { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ]
   };

   const action = removeTaskAC("2", "todolistId2");

   const endState = tasksReducer(startState, action)

   expect(endState['todolistId1'].length).toBe(3)
   expect(endState['todolistId2'].length).toBe(2)
});

test.skip('tasks should be added correctly', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ],
      "todolistId2": [
         { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ]
   };

   const action = addTaskAC('Juice', 'todolistId2')
   const endState = tasksReducer(startState, action)

   expect(endState['todolistId2'].length).toBe(4)
   expect(endState['todolistId1'].length).toBe(3)
   expect(endState['todolistId2'][0].title).toBe('Juice')
   expect(endState['todolistId2'][0].id).toBeDefined()
   expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test.skip('status of tasks should be changed correctly', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ],
      "todolistId2": [
         { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ]
   };

   const action = changeStatusTaskAC('2', TaskStatuses.New, 'todolistId2')
   const endState = tasksReducer(startState, action)


   expect(endState['todolistId1'][0].status).toBe(TaskStatuses.Completed)
   expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
   // expect(endState['todolistId2'][1].status).toBeFalsy()
})

test.skip('task title should be changed correctly', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ],
      "todolistId2": [
         { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ]
   };

   const action = changeTaskTitleAC('2', 'New title', 'todolistId2')
   const endState = tasksReducer(startState, action)

   expect(endState['todolistId2'][1].title).toBe('New title')
   expect(endState['todolistId1'][1].title).toBe('JS')
})

test.skip('new property with new array should be added when new todolist is added', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ],
      "todolistId2": [
         { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ]
   };
   const action = addTodolistAC('New todolist')
   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState);
   const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
   if (!newKey) {
      throw Error('New key should be added')
   }
   expect(keys.length).toBe(3);
   expect(endState[newKey]).toEqual([]);
})

test.skip('property with todolistId should be deleted', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ],
      "todolistId2": [
         { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
         { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
      ]
   };
   const action = removeTodolistAC('todolistId2')
   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState);

   expect(keys.length).toBe(1)
   expect(endState['todolistId2']).toBeUndefined();
})