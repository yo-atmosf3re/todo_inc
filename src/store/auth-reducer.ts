import { LoginParamType } from './../api/api.types';
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
   isInitialized: true
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

const initializaAppTC = () => async (dispatch: Dispatch) => {
   const { data } = await authAPI.me()
   try {
      if (data.resultCode === 0) {
         dispatch(setIsLoggedInAC(true, '1'))
      }
   } catch (error) {
      console.log(error)
   }
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
   dispatch(setSwitchLinearAC(true))
   dispatch(setStatusAC('loading'))
   try {
      const { data } = await authAPI.login(email, password, rememberMe)
      // dispatch(setIsLoggedInAC(true, '1'))
      // dispatch(setStatusAC('succeeded'))
      if (data.resutCode === 0) {
         dispatch(setIsLoggedInAC(true, '1'))
         dispatch(setStatusAC('succeeded'))
      }
      if (data.resutCode > 0) {
         dispatch(setIsLoggedInAC(false, '0'))
      }
      // else {
      //    // dispatch(setStatusAC('failed'))
      //    dispatch(setSwitchLinearAC(false))
      //    dispatch(setIsLoggedInAC(false, '0'))
      //    uploadFailureHandler(dispatch, data.messages[0])
      // }
   } catch (error) {
      // if (data.resutCode > 0) {
      //    dispatch(setIsLoggedInAC(false, '0'))
      // }
      console.log(error, 'login')
      // dispatch(setSwitchLinearAC(false))
      // dispatch(setIsLoggedInAC(false, '0'))
      // uploadFailureHandler(dispatch, data.messages[0])
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
   // dispatch(setInitializationAC(false))
   dispatch(setStatusAC('loading'))
   const { data } = await authAPI.me()
   try {
      if (data.resultCode > 0) {
         dispatch(setIsLoggedInAC(false, '0'))
         uploadFailureHandler(dispatch, data.messages[0])
      } else {
         dispatch(setStatusAC('succeeded'))
         dispatch(setIsLoggedInAC(true, '1'))
         dispatch(setInitializationAC(true))
      }
   } catch (error) {
      console.log(error, 'me')
      uploadFailureHandler(dispatch, data.messages[0])
      dispatch(setIsLoggedInAC(false, '0'))
   }
}