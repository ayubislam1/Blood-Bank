import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayOuts from "../layouts/MainLayOuts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../layouts/Dashboard";
import ProfilePage from "../pages/Profilepage";
import PrivateRouter from "./PrivateRouter";
import DonorHome from "../pages/Dashboard/Donor/DonorHome";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";
import BloodDonationRequests from "../pages/BloodDonationRequests";
import BloodDonationRequestDetails from "../pages/BloodDonationRequestDetails";
import ViewDonationRequest from "../pages/Dashboard/Donor/ViewDonationRequest";
import EditDonationRequest from "../pages/Dashboard/Donor/EditDonationRequest";

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
			{
				path: "/donation-requests",
				element: <BloodDonationRequests></BloodDonationRequests>,
			},
			{
				path: "/donation-requests/:id",
				element: (
					<PrivateRouter>
						<BloodDonationRequestDetails></BloodDonationRequestDetails>
					</PrivateRouter>
				),
			},
		],
	},
	{
		path: "/dashboard",
		element: <Dashboard></Dashboard>,
		children: [
			{
				path: "/dashboard/profile/:email",
				element: (
					<PrivateRouter>
						<ProfilePage></ProfilePage>
					</PrivateRouter>
				),
				loader: ({ params }) =>
					fetch(`http://localhost:7000/all-users/${params.email}`),
			},
			{
				path: "/dashboard/donorHome",
				element: <DonorHome></DonorHome>,
			},
			{
				path: "/dashboard/myRequest",
				element: <MyDonationRequests></MyDonationRequests>,
				
			},
			{
				path: "/dashboard/createRequest",
				element: <CreateDonationRequest></CreateDonationRequest>,
			},
			{
				path:"/dashboard/edit/:id",
				element:<EditDonationRequest></EditDonationRequest>
			},
			{
				path:"/dashboard/view/:id",
				element:<ViewDonationRequest></ViewDonationRequest>
			}
		],
	},
]);

export default router;
