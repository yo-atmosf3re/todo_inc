import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage, Login, MainLayout, NotFound } from './pages';

export const App = () => {
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