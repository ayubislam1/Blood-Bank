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
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AllUsersPage from "../pages/Dashboard/Admin/AllUsersPage";
import AllDonationRequests from "../pages/Dashboard/Admin/AllDonationRequests";
import ContentManagement from "../pages/Dashboard/Admin/ContentManagement";
import AddBlog from "../pages/Dashboard/Admin/AddBlog";
import Blog from "../pages/Blog";
import VolunteerDashboard from "../pages/Volunteer/VolunteerDashboard";
import VolunteerDonationRequests from "../pages/Volunteer/VolunteerDonationRequests";
import SearchPage from "../pages/SearchPage";
import FundingPage from "../pages/FundingPage";
import Payment from "../pages/Payment";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayOuts></MainLayOuts>,
		errorElement: <ErrorPage></ErrorPage>,
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
			{
				path: "/blog",
				element: <Blog></Blog>,
			},
			{
				path: "/search",
				element: <SearchPage></SearchPage>,
			},
			{
				path: "/funding",
				element: (
					<PrivateRouter>
						<FundingPage></FundingPage>
					</PrivateRouter>
				),
			},
			{
				path: "/payment",
				element: <Payment></Payment>,
			},
		],
	},
	{
		path: "/dashboard",
		element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
		children: [
			{
				path: "/dashboard/profile/:email",
				element: (
					<PrivateRouter>
						<ProfilePage></ProfilePage>
					</PrivateRouter>
				),
				loader: async ({ params }) =>
					await fetch(`http://localhost:7000/all-users/${params.email}`),
			},

			{
				path: "/dashboard/admin",
				element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
			},
			{
				path: "/dashboard/allUsers",
				element: <AdminRoute><AllUsersPage></AllUsersPage></AdminRoute>,
			},
			{
				path: "/dashboard/all-donation-request",
				element: <AdminRoute><AllDonationRequests></AllDonationRequests></AdminRoute>,
			},
			{
				path: "/dashboard/content-management",
				element: <ContentManagement></ContentManagement>,
			},
			{
				path: "/dashboard/add-blog",
				element: <AddBlog></AddBlog>,
			},
			//donor pages
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
				path: "/dashboard/edit/:id",
				element: <EditDonationRequest></EditDonationRequest>,
			},
			{
				path: "/dashboard/view/:id",
				element: <ViewDonationRequest></ViewDonationRequest>,
			},

			//volunteer
			{
				path: "/dashboard/volunteer-home",
				element: <VolunteerDashboard></VolunteerDashboard>,
			},
			{
				path: "/dashboard/volunteer-donation-request",
				element: <VolunteerDonationRequests></VolunteerDonationRequests>,
			},
		],
	},
]);

export default router;
