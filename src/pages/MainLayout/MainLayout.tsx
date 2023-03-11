import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { cyan } from '@mui/material/colors'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components'
import { AuthInitialStateType } from '../../store/auth-reducer'
import { AppRootStateType } from '../../store/store'
import { CircularProgress } from '@mui/material';

// * MUI theme
export const THEME = createTheme({
   palette: {
      primary: cyan,
      secondary: {
         main: '#80deea',
      },
   },
})

const CIRCULAR_SOME_STYLE: React.CSSProperties = { position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }

export const MainLayout = () => {
   const { isInitialized } = useSelector<AppRootStateType, AuthInitialStateType>(state => state.auth)
   return (
      <ThemeProvider theme={THEME}>
         <Header />
         {
            isInitialized
               ?
               <Outlet />
               :
               <div
                  style={CIRCULAR_SOME_STYLE}>
                  <CircularProgress />
               </div>
         }
      </ThemeProvider>
   )
}