import {
   Box, AppBar, Toolbar,
   IconButton, Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

export const Header = () => {
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
         </AppBar>
      </Box>
   )
}