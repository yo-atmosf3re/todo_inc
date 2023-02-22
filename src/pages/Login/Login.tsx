import React, { Fragment } from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { FormikErrorType } from './Login.types';
import * as Yup from 'yup'
import { loginTC } from '../../store/auth-reducer';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../store/store';

const COMMON_STYLES = { textDecoration: 'none' }

const validationSchema = Yup.object({
   email: Yup.string().max(30, 'Must be 30 characters or less').required('Login is required'),
   password: Yup.string().max(16, 'Must be 16 characters or less').required('Password is required')
})

export const Login: React.FC = () => {
   const dispatch = useDispatch<AppDispatchType>()

   const { handleSubmit, handleChange, values,
      errors, touched, getFieldProps,
      resetForm
   } = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false
      },
      onSubmit: (values) => {
         dispatch(loginTC(values.email, values.password, values.rememberMe))
         console.log(values)
         resetForm()
      },
      validate: (values) => {
         const errors: FormikErrorType = {};
         if (!values.email) {
            errors.email = 'Mail is required';
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
         } else if (values.password.length > 17) {
            errors.password = 'Password must be 16 characters or less';
         }
         return errors;
      },
      validationSchema
   })

   return (
      <Grid
         container
         justifyContent={'center'}
      >
         <Grid
            item
            justifyContent={'center'}
         >
            <form onSubmit={handleSubmit}>
               <FormControl>
                  <FormLabel>
                     <p>To log in get registered
                        <NavLink
                           style={COMMON_STYLES}
                           to='https://social-network.samuraijs.com/'
                           target={'_blank'}
                        >
                           <span> here</span>
                        </NavLink>
                     </p>
                     <p>
                        or use common test account credentials:
                     </p>
                     <p>
                        Email: free@samuraijs.com
                     </p>
                     <p>
                        Password: free
                     </p>
                  </FormLabel>
                  <FormGroup>
                     <TextField
                        label="Email"
                        margin="normal"
                        error={!!errors.email && touched.email}
                        {...getFieldProps('email')}
                     />
                     {
                        touched.email && errors.email
                           ? <span style={{ color: 'red' }}>
                              {errors.email}
                           </span>
                           : null
                     }
                     <TextField
                        label="Password"
                        margin="normal"
                        error={!!errors.password && touched.password}
                        {...getFieldProps('password')}
                     />
                     {
                        touched.password && errors.password
                           ? <span style={{ color: 'red' }}>
                              {errors.password}
                           </span>
                           : null
                     }
                     <FormControlLabel
                        label={'Remember me'}
                        control={
                           <Checkbox
                              name='rememberMe'
                              checked={values.rememberMe}
                              onChange={handleChange}
                           />}
                     />
                     <Button
                        disabled={!!errors.email || !!errors.password}
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                     >
                        Login
                     </Button>
                  </FormGroup>
               </FormControl>
            </form>
         </Grid>
      </Grid >
   )
}