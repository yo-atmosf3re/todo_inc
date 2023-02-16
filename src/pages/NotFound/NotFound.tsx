import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { cyan } from '@mui/material/colors'
import { NavLink } from 'react-router-dom'
import { ErrorType, NotFoundPropsType } from './NotFound.types'

const COMMON_STYLES = { textDecoration: 'none', color: 'black' }

const ERROR_CONTENT = [
   'The page you’re looking for doesn’t exist.',
   'The requesting page is either not found or the resource is not available.',
   'Sorry, unexpected server error. Contact the technical support of the service or come back later.'
]

const SET_CONTENT_ERROR = (type: ErrorType): string | undefined => {
   if (type === 'link') {
      return ERROR_CONTENT[0]
   }
   if (type === 'page') {
      return ERROR_CONTENT[1]
   }
   if (type === 'server') {
      return ERROR_CONTENT[2]
   }
}

export const NotFound: React.FC<NotFoundPropsType> = ({
   type
}) => {
   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: cyan[800],
         }}
      >
         <Typography
            variant="h1"
            style={{ color: 'white' }}
         >
            404
         </Typography>
         <Typography
            variant="h6"
            style={{ color: 'white' }}
         >
            {
               SET_CONTENT_ERROR(type)
            }
         </Typography>
         <Button variant="contained">
            <NavLink
               style={COMMON_STYLES}
               to={'/'}
            >
               Back main page
            </NavLink>
         </Button>
      </Box>
   )
}