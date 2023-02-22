import { appReducer } from './app-reducer';
import { ActionsTasksReducerType, tasksReducer } from './tasks-reducer';
import { ActionsTodolistsReducerType, todolistsReducer } from './todolists-reducer';
import { AnyAction, applyMiddleware, legacy_createStore as createStore } from 'redux'
import { combineReducers } from "redux";
import thunk, { ThunkDispatch } from 'redux-thunk';
import { authReducer } from './auth-reducer';

const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer,
   app: appReducer,
   auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppActionsType = ActionsTodolistsReducerType | ActionsTasksReducerType

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

// @ts-ignore
window.store = store;