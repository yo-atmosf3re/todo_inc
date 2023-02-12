import { Dispatch } from "redux"
import { setSwitchLinearAC, setStatusAC, SetStatusActionType, SetSwitchLinearActionType, setErrorAC, SetAppErrorActionType } from "../store/app-reducer"
import { changeTodolistEntityStatusAC, ChangeTodolistEntityStatusAT } from "../store/todolists-reducer"

type DowloadProcessHandlerDispatchType = Dispatch<SetSwitchLinearActionType | SetStatusActionType | ChangeTodolistEntityStatusAT | SetAppErrorActionType>;
type StatusDowloadHandlerType = 'after' | 'before' | 'idle'

type UploadFailureHandlerDispatchType = SetStatusActionType | SetAppErrorActionType

export const dowloadProcessHandler = (
   dispatch: DowloadProcessHandlerDispatchType,
   todolistId: string,
   status: StatusDowloadHandlerType): void => {
   if (status === 'before') {
      dispatch(changeTodolistEntityStatusAC('loading', todolistId))
      dispatch(setSwitchLinearAC(true))
      dispatch(setStatusAC('loading'))
   }
   if (status === 'after') {
      dispatch(setStatusAC('succeeded'))
      dispatch(setErrorAC('The change was successful!'))
      dispatch(changeTodolistEntityStatusAC('idle', todolistId))
   }
   if (status === 'idle') {
      dispatch(setStatusAC('succeeded'))
      dispatch(changeTodolistEntityStatusAC('idle', todolistId))
   }
}

export const uploadFailureHandler = (
   dispatch: Dispatch<UploadFailureHandlerDispatchType>,
   message: string | null): void => {
   dispatch(setStatusAC('failed'))
   dispatch(setErrorAC(message))
}