import { CircularProgress } from '@mui/material';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { MainPage, Login, MainLayout, NotFound } from './pages';
import { AuthInitialStateType, meTC } from './store/auth-reducer';
import { AppDispatchType, AppRootStateType } from './store/store'

export const App = () => {

    const { isLoggedIn, status } = useSelector<AppRootStateType, AuthInitialStateType>(state => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        if (status === '0') {
            navigate('/login')
        }
        if (status === '1') {
            navigate('/')
        }
    }, [isLoggedIn])

    useEffect(() => {
        dispatch(meTC())
    }, [status])

    return (
        <Routes>
            <Route
                path='/'
                element={<MainLayout />}
            >
                <Route
                    path='/login'
                    element={
                        <Suspense fallback={<NotFound type='page' />}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path='/'
                    element={
                        <Suspense fallback={<NotFound type='page' />}>
                            <MainPage />
                        </Suspense>
                    }
                />
                <Route
                    path='*'
                    element={<Navigate to='/incorrect-link-error' />}
                />
                <Route
                    path='/incorrect-link-error'
                    element={<NotFound type='link' />}
                />
            </Route>
        </Routes>
    );
}