import { removeTaskAC, tasksReducer, addTaskAC, changeStatusTaskAC, changeTaskTitleAC } from './tasks-reducer';
import { TasksStateType } from '../App';
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';

test.skip('correct task should be deleted from correct array', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", isDone: false },
         { id: "2", title: "JS", isDone: true },
         { id: "3", title: "React", isDone: false }
      ],
      "todolistId2": [
         { id: "1", title: "bread", isDone: false },
         { id: "2", title: "milk", isDone: true },
         { id: "3", title: "tea", isDone: false }
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
         { id: "1", title: "CSS", isDone: false },
         { id: "2", title: "JS", isDone: true },
         { id: "3", title: "React", isDone: false }
      ],
      "todolistId2": [
         { id: "1", title: "bread", isDone: false },
         { id: "2", title: "milk", isDone: true },
         { id: "3", title: "tea", isDone: false }
      ]
   };

   const action = addTaskAC('Juice', 'todolistId2')
   const endState = tasksReducer(startState, action)

   expect(endState['todolistId2'].length).toBe(4)
   expect(endState['todolistId1'].length).toBe(3)
   expect(endState['todolistId2'][0].title).toBe('Juice')
   expect(endState['todolistId2'][0].id).toBeDefined()
   expect(endState['todolistId2'][0].isDone).toBe(false)
})

test.skip('status of tasks should be changed correctly', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", isDone: false },
         { id: "2", title: "JS", isDone: true },
         { id: "3", title: "React", isDone: false }
      ],
      "todolistId2": [
         { id: "1", title: "bread", isDone: false },
         { id: "2", title: "milk", isDone: true },
         { id: "3", title: "tea", isDone: false }
      ]
   };

   const action = changeStatusTaskAC('2', false, 'todolistId2')
   const endState = tasksReducer(startState, action)


   expect(endState['todolistId1'][0].isDone).toBe(false)
   expect(endState['todolistId2'][0].isDone).toBe(false)
   expect(endState['todolistId2'][1].isDone).toBeFalsy()
})

test.skip('task title should be changed correctly', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", isDone: false },
         { id: "2", title: "JS", isDone: true },
         { id: "3", title: "React", isDone: false }
      ],
      "todolistId2": [
         { id: "1", title: "bread", isDone: false },
         { id: "2", title: "milk", isDone: true },
         { id: "3", title: "tea", isDone: false }
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
         { id: "1", title: "CSS", isDone: false },
         { id: "2", title: "JS", isDone: true },
         { id: "3", title: "React", isDone: false }
      ],
      "todolistId2": [
         { id: "1", title: "bread", isDone: false },
         { id: "2", title: "milk", isDone: true },
         { id: "3", title: "tea", isDone: false }
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
         { id: "1", title: "CSS", isDone: false },
         { id: "2", title: "JS", isDone: true },
         { id: "3", title: "React", isDone: false }
      ],
      "todolistId2": [
         { id: "1", title: "bread", isDone: false },
         { id: "2", title: "milk", isDone: true },
         { id: "3", title: "tea", isDone: false }
      ]
   };
   const action = removeTodolistAC('todolistId2')
   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState);

   expect(keys.length).toBe(1)
   expect(endState['todolistId2']).toBeUndefined();
})