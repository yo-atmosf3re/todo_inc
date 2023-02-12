import {
   Box, AppBar, Toolbar,
   IconButton, Typography, LinearProgress
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/store'
import { AppReducerInitialStateType, setSwitchLinearAC } from '../../store/app-reducer';
import { ErrorSnackbar } from '../ErrorSnackbar';
import { useDispatch } from 'react-redux';

export const Header = () => {
   const { status, switchLinear } = useSelector<AppRootStateType, AppReducerInitialStateType>(state => state.app)
   const dispatch = useDispatch()

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