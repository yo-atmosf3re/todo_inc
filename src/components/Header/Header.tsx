import {
   Box, AppBar, Toolbar,
   IconButton, Typography, LinearProgress
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/store'
import { AppReducerInitialStateType } from '../../store/app-reducer';

export const Header = () => {
   const { status } = useSelector<AppRootStateType, AppReducerInitialStateType>(state => state.app)
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
            </Toolbar>
            {
               status === 'loading' && <LinearProgress />
            }
            {
               status === 'failed' && <LinearProgress color='error' />
            }
         </AppBar>
      </Box>
   )
}