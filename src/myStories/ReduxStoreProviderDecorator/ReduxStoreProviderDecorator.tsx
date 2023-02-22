// import React from 'react'
// import { Provider } from 'react-redux'
// import { combineReducers, createStore } from 'redux'
// import { v1 } from 'uuid'
// import { TaskPriorities, TaskStatuses } from '../../api/api.types'
// import { AppRootStateType } from '../../store/store'
// import { tasksReducer } from '../../store/tasks-reducer'
// import { todolistsReducer } from '../../store/todolists-reducer'

// const rootReducer = combineReducers({
//    tasks: tasksReducer,
//    todolists: todolistsReducer
// })

// const initialGlobalState: AppRootStateType = {
//    todolists: [
//       { id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle' },
//       { id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle' }
//    ],
//    tasks: {
//       ["todolistId1"]: [
//          { id: v1(), title: "HTML&CSS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', status: TaskStatuses.Completed, todoListId: "todolistId1", entityStatus: 'idle' },
//          { id: v1(), title: "JS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', status: TaskStatuses.Completed, todoListId: "todolistId1", entityStatus: 'idle' }
//       ],
//       ["todolistId2"]: [
//          { id: v1(), title: "Milk", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', status: TaskStatuses.Completed, todoListId: "todolistId2", entityStatus: 'idle' },
//          { id: v1(), title: "React Book", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', status: TaskStatuses.Completed, todoListId: "todolistId2", entityStatus: 'idle' }
//       ]
//    },
//    app: {
//       status: 'loading',
//       error: null,
//       switchLinear: false
//    },
//    auth: {
//       email: '',
//       id: 0,
//       login: '',
//    }
// };

// export const storyBookStore = createStore(rootReducer, initialGlobalState);

// export const ReduxStoreProviderDecorator = (storyFn: any) => (
//    <Provider
//       store={storyBookStore}>{storyFn()}
//    </Provider>)

export { }