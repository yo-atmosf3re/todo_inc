import {
   Box, AppBar, Toolbar,
   IconButton, Typography, LinearProgress, Button
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { AppDispatchType, AppRootStateType } from '../../store/store'
import { AppReducerInitialStateType, setSwitchLinearAC } from '../../store/app-reducer';
import { ErrorSnackbar } from '../ErrorSnackbar';
import { useDispatch } from 'react-redux';
import { AuthInitialStateType, logoutTC } from '../../store/auth-reducer';

export const Header = () => {
   const { status, switchLinear } = useSelector<AppRootStateType, AppReducerInitialStateType>(state => state.app)
   const { isLoggedIn } = useSelector<AppRootStateType, AuthInitialStateType>(state => state.auth)
   const dispatch = useDispatch<AppDispatchType>()

   useEffect(() => {
      const timeout = setTimeout(() => {
         dispatch(setSwitchLinearAC(false))
      }, 700);
      return () => {
         clearInterval(timeout)
      }
   }, [switchLinear])

   return (
      <Box sx={{ flexGrow: 2 }}>
         <AppBar
            color='primary'
            position="relative">
            <Toolbar>
               <IconButton
                  size="medium"
                  edge="start"
                  color="default"
                  sx={{ mr: 5 }}
               >
                  <MenuIcon />
               </IconButton>
               <Typography
                  variant="h4"
                  component="div"
                  sx={{ flexGrow: 1 }}>
                  Todolist
               </Typography>
               {
                  isLoggedIn &&
                  <Button
                     color='inherit'
                     variant='outlined'
                     size='large'
                     sx={{ fontSize: '20px' }}
                     onClick={() => { dispatch(logoutTC()) }}
                  >
                     LOGOUT
                  </Button>
               }
               <ErrorSnackbar />
            </Toolbar>
            {
               switchLinear
               &&
               <LinearProgress
                  color={status === 'failed' ? 'error' : 'primary'}
               />
            }
         </AppBar>
      </Box>
   )
}