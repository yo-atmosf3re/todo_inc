import { authAPI } from './../api/todolists-API';
import { Dispatch } from 'redux';
import { setSwitchLinearAC, setStatusAC } from './app-reducer';
import { uploadFailureHandler } from '../utils/error-utils';

type SetIsLoggedInAT = {
   type: "login/SET-IS-LOGGED-IN"
   isLoggedIn: boolean
   status: '0' | '1'
}

type SetInitializationAT = {
   type: 'me/SET-INITIALIZATION'
   init: boolean
}

type ActionType = SetIsLoggedInAT | SetInitializationAT

export type AuthInitialStateType = {
   isLoggedIn: boolean
   status: '0' | '1'
   isInitialized: boolean
}

const initialState: AuthInitialStateType = {
   isLoggedIn: false,
   status: '0',
   isInitialized: false
}

export const authReducer = (state: AuthInitialStateType = initialState, action: ActionType): AuthInitialStateType => {
   switch (action.type) {
      case "login/SET-IS-LOGGED-IN": {
         return { ...state, isLoggedIn: action.isLoggedIn, status: action.status }
      }
      case "me/SET-INITIALIZATION": {
         return { ...state, isInitialized: action.init }
      }
      default: return state
   }
}

export const setIsLoggedInAC = (isLoggedIn: boolean, status: '0' | '1'): SetIsLoggedInAT => ({ type: "login/SET-IS-LOGGED-IN", isLoggedIn, status })

export const setInitializationAC = (init: boolean): SetInitializationAT => ({ type: 'me/SET-INITIALIZATION', init })

export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
   console.log('login')
   dispatch(setSwitchLinearAC(true))
   dispatch(setStatusAC('loading'))
   const { data } = await authAPI.login(email, password, rememberMe)
   try {
      if (data.resultCode === 0) {
         console.log('result 0')
         dispatch(setIsLoggedInAC(true, '1'))
         dispatch(setStatusAC('succeeded'))
      }
      if (data.resultCode > 0) {
         console.log('result > 0')
         dispatch(setIsLoggedInAC(false, '0'))
         dispatch(setSwitchLinearAC(false))
         uploadFailureHandler(dispatch, data.messages[0])
      }
   } catch (error) {
      console.log(error, 'login')
   }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
   dispatch(setSwitchLinearAC(true))
   dispatch(setStatusAC('loading'))
   const { data } = await authAPI.logout()
   try {
      dispatch(setStatusAC('succeeded'))
      dispatch(setIsLoggedInAC(false, '0'))
      dispatch(setSwitchLinearAC(false))
   } catch (error) {
      console.log(error, 'error')
      dispatch(setSwitchLinearAC(false))
   }
}

export const meTC = () => async (dispatch: Dispatch) => {
   dispatch(setSwitchLinearAC(true))
   dispatch(setStatusAC('loading'))
   const { data } = await authAPI.me()
   try {
      if (data.resultCode === 0) {
         dispatch(setInitializationAC(true))
         dispatch(setStatusAC('succeeded'))
         dispatch(setIsLoggedInAC(true, '1'))
      }
      if (data.resultCode > 0) {
         dispatch(setIsLoggedInAC(false, '0'))
         dispatch(setInitializationAC(true))
         uploadFailureHandler(dispatch, data.messages[0])
      }
   } catch (error) {
      console.log(error, 'me')
      uploadFailureHandler(dispatch, data.messages[0])
      dispatch(setIsLoggedInAC(false, '0'))
   }
}