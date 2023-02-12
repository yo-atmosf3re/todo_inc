import React, { useState } from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/store';
import { AppReducerInitialStateType, setErrorAC } from '../../store/app-reducer';
import { useDispatch } from 'react-redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref,
) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
   const [open, setOpen] = useState<boolean>(false)
   const { error } = useSelector<AppRootStateType, AppReducerInitialStateType>(state => state.app)
   const dispatch = useDispatch()

   React.useEffect(() => {
      setOpen(true)
   }, [error])

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }
      dispatch(setErrorAC(null))
      setOpen(false);
   };

   return (
      <>
         <Snackbar
            open={error !== null}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         >
            <Alert
               onClose={handleClose}
               severity='info'
            >
               {
                  open && error
               }
            </Alert>
         </Snackbar>
      </>
   )
}