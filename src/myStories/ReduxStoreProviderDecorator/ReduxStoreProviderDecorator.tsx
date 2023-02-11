import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from '../../api/todolists-API'
import { AppRootStateType } from '../../store/store'
import { tasksReducer } from '../../store/tasks-reducer'
import { todolistsReducer } from '../../store/todolists-reducer'

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
   todolists: [
      { id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0 },
      { id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0 }
   ],
   tasks: {
      ["todolistId1"]: [
         { id: v1(), title: "HTML&CSS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', status: TaskStatuses.Completed, todoListId: "todolistId1" },
         { id: v1(), title: "JS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', status: TaskStatuses.Completed, todoListId: "todolistId1" }
      ],
      ["todolistId2"]: [
         { id: v1(), title: "Milk", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', status: TaskStatuses.Completed, todoListId: "todolistId2" },
         { id: v1(), title: "React Book", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', status: TaskStatuses.Completed, todoListId: "todolistId2" }
      ]
   },
   app: {
      status: 'loading'
   }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
   <Provider
      store={storyBookStore}>{storyFn()}
   </Provider>)