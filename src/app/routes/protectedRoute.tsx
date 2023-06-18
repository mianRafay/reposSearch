import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import RouteLocale from 'app/routes/locales';
import { getAccountNo } from 'app/utils/common';

export default function ProtectedRoute() {
    return getAccountNo() ? (
        <>
            <Typography component="div" className="app">
                <Outlet />
            </Typography>
        </>
    ) : (
        <Navigate to={RouteLocale.login} />
    );
}
