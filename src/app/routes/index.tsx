import React from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import Error404 from 'app/components/Error404';
import Dashboard from 'app/components/Dashboard';
import Favorites from 'app/components/Favorites';

export default function routes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />        
            <Route path="/favorites" element={<Favorites />} />        
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<Error404 />} />
        </Routes>
    );
}
