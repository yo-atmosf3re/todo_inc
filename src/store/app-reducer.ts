export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorRequestType = string | null

export type AppReducerInitialStateType = {
   status: RequestStatusType
   error: ErrorRequestType
   switchLinear: boolean
}

export type SetStatusActionType = {
   type: 'APP/SET-STATUS'
   status: RequestStatusType
}
export type SetAppErrorActionType = {
   type: 'APP/SET-ERROR'
   error: ErrorRequestType
}
export type SetSwitchLinearActionType = {
   type: 'APP/SWITCH-LINEAR'
   switchLinear: boolean
}

type ActionType = SetStatusActionType | SetAppErrorActionType | SetSwitchLinearActionType

const initialState: AppReducerInitialStateType = {
   status: 'loading',
   error: null,
   switchLinear: false
}

export const appReducer = (state: AppReducerInitialStateType = initialState, action: ActionType): AppReducerInitialStateType => {
   switch (action.type) {
      case 'APP/SET-STATUS': {
         return { ...state, status: action.status }
      }
      case 'APP/SET-ERROR': {
         return { ...state, error: action.error }
      }
      case 'APP/SWITCH-LINEAR': {
         return { ...state, switchLinear: action.switchLinear }
      }
      default: return state
   }
}

export const setStatusAC = (status: RequestStatusType): SetStatusActionType => ({ type: 'APP/SET-STATUS', status })

export const setErrorAC = (error: ErrorRequestType): SetAppErrorActionType => ({ type: 'APP/SET-ERROR', error })

export const setSwitchLinearAC = (switchLinear: boolean): SetSwitchLinearActionType => ({ type: 'APP/SWITCH-LINEAR', switchLinear })
