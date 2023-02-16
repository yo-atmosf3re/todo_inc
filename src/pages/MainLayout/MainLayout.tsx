import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { cyan } from '@mui/material/colors'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components'

// * MUI theme
export const THEME = createTheme({
   palette: {
      primary: cyan,
      secondary: {
         main: '#80deea',
      },
   },
})

export const MainLayout = () => {
   return (
      <ThemeProvider theme={THEME}>
         <Header />
         <Outlet />
      </ThemeProvider>
   )
}