export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppReducerInitialStateType = {
   status: RequestStatusType
}

export type SetStatusActionType = {
   type: 'APP/SET-STATUS'
   status: RequestStatusType
}

type ActionType = SetStatusActionType

const initialState: AppReducerInitialStateType = {
   status: 'loading'
}

export const appReducer = (state: AppReducerInitialStateType = initialState, action: ActionType): AppReducerInitialStateType => {
   switch (action.type) {
      case 'APP/SET-STATUS': {
         return { ...state, status: action.status }
      }
      default: return state
   }
}

export const setStatusAC = (status: RequestStatusType): SetStatusActionType => ({ type: 'APP/SET-STATUS', status })