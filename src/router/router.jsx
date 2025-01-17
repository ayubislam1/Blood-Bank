import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayOuts from "../layouts/MainLayOuts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../layouts/Dashboard";
import ProfilePage from "../pages/Profilepage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayOuts></MainLayOuts>,
		errorElement: <h1>Error</h1>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/register",
				element: <Register></Register>,
			},
		],
	},
	{
		path: "/dashboard",
		element: <Dashboard></Dashboard>,
		children: [
			{
				path: "/dashboard/profile/:email",
				element: <ProfilePage></ProfilePage>,
				loader: ({ params }) =>
					fetch(`http://localhost:7000/all-users/${params.email}`),
			},
		],
	},
]);

export default router;
