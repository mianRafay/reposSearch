import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Error404 from 'app/components/Error404';
import Dashboard from 'app/components/Dashboard';
import Favorites from 'app/components/Favorites';
import Locales from './locales';

export default function routes() {
    return (
        <Routes>
            <Route index element={<Dashboard />} />        
            <Route path="/favorites" element={<Favorites />} />        
            <Route path="/404" element={<Error404 />} />
        </Routes>
    );
}
