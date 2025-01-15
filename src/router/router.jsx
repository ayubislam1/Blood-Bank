
import React from 'react';
import { createBrowserRouter } from "react-router";
import MainLayOuts from '../layouts/MainLayOuts';

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayOuts></MainLayOuts>
    }
])

export default router;