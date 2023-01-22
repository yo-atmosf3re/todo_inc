import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { combineReducers } from "redux";
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;