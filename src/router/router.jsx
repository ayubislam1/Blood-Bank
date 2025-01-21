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
import { Helmet } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOuts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Helmet>
              <title>Home - Blood Donation</title>
              <meta name="description" content="Welcome to the Blood Donation platform." />
            </Helmet>
            <Home />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <Helmet>
              <title>Login - Blood Donation</title>
              <meta name="description" content="Login to access your account." />
            </Helmet>
            <Login />
          </>
        ),
      },
      {
        path: "/register",
        element: (
          <>
            <Helmet>
              <title>Register - Blood Donation</title>
              <meta name="description" content="Create an account to join the Blood Donation platform." />
            </Helmet>
            <Register />
          </>
        ),
      },
      {
        path: "/donation-requests",
        element: (
          <>
            <Helmet>
              <title>Donation Requests - Blood Donation</title>
              <meta name="description" content="View all blood donation requests." />
            </Helmet>
            <BloodDonationRequests />
          </>
        ),
      },
      {
        path: "/donation-requests/:id",
        element: (
          <PrivateRouter>
            <>
              <Helmet>
                <title>Donation Request Details - Blood Donation</title>
                <meta name="description" content="View details of a specific blood donation request." />
              </Helmet>
              <BloodDonationRequestDetails />
            </>
          </PrivateRouter>
        ),
      },
      {
        path: "/blog",
        element: (
          <>
            <Helmet>
              <title>Blog - Blood Donation</title>
              <meta name="description" content="Read our latest articles and updates." />
            </Helmet>
            <Blog />
          </>
        ),
      },
      {
        path: "/search",
        element: (
          <>
            <Helmet>
              <title>Search - Blood Donation</title>
              <meta name="description" content="Search for blood donation requests and resources." />
            </Helmet>
            <SearchPage />
          </>
        ),
      },
      {
        path: "/funding",
        element: (
          <PrivateRouter>
            <>
              <Helmet>
                <title>Funding - Blood Donation</title>
                <meta name="description" content="Support our blood donation platform through funding." />
              </Helmet>
              <FundingPage />
            </>
          </PrivateRouter>
        ),
      },
      {
        path: "/payment",
        element: (
          <>
            <Helmet>
              <title>Payment - Blood Donation</title>
              <meta name="description" content="Complete your payment securely." />
            </Helmet>
            <Payment />
          </>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard/profile/:email",
        element: (
          <>
            <Helmet>
              <title>Profile - Blood Donation</title>
              <meta name="description" content="View and update your profile details." />
            </Helmet>
            <ProfilePage />
          </>
        ),
        loader: async ({ params }) =>
          await fetch(`http://localhost:7000/all-users/${params.email}`),
      },
      {
        path: "/dashboard/admin",
        element: (
          <AdminRoute>
            <>
              <Helmet>
                <title>Admin Dashboard - Blood Donation</title>
                <meta name="description" content="Manage the Blood Donation platform." />
              </Helmet>
              <AdminDashboard />
            </>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allUsers",
        element: (
          <AdminRoute>
            <>
              <Helmet>
                <title>All Users - Blood Donation</title>
                <meta name="description" content="View and manage all registered users." />
              </Helmet>
              <AllUsersPage />
            </>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-donation-request",
        element: (
          <AdminRoute>
            <>
              <Helmet>
                <title>All Donation Requests - Blood Donation</title>
                <meta name="description" content="View and manage all blood donation requests." />
              </Helmet>
              <AllDonationRequests />
            </>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/content-management",
        element: (
          <>
            <Helmet>
              <title>Content Management - Blood Donation</title>
              <meta name="description" content="Manage content for the Blood Donation platform." />
            </Helmet>
            <ContentManagement />
          </>
        ),
      },
      {
        path: "/dashboard/add-blog",
        element: (
          <>
            <Helmet>
              <title>Add Blog - Blood Donation</title>
              <meta name="description" content="Create and publish a new blog post." />
            </Helmet>
            <AddBlog />
          </>
        ),
      },
      {
        path: "/dashboard/donorHome",
        element: (
          <>
            <Helmet>
              <title>Donor Home - Blood Donation</title>
              <meta name="description" content="Welcome to your donor dashboard." />
            </Helmet>
            <DonorHome />
          </>
        ),
      },
      {
        path: "/dashboard/myRequest",
        element: (
          <>
            <Helmet>
              <title>My Donation Requests - Blood Donation</title>
              <meta name="description" content="View your blood donation requests." />
            </Helmet>
            <MyDonationRequests />
          </>
        ),
      },
      {
        path: "/dashboard/createRequest",
        element: (
          <>
            <Helmet>
              <title>Create Donation Request - Blood Donation</title>
              <meta name="description" content="Submit a new blood donation request." />
            </Helmet>
            <CreateDonationRequest />
          </>
        ),
      },
      {
        path: "/dashboard/edit/:id",
        element: (
          <>
            <Helmet>
              <title>Edit Donation Request - Blood Donation</title>
              <meta name="description" content="Edit your blood donation request details." />
            </Helmet>
            <EditDonationRequest />
          </>
        ),
      },
      {
        path: "/dashboard/view/:id",
        element: (
          <>
            <Helmet>
              <title>View Donation Request - Blood Donation</title>
              <meta name="description" content="View the details of your blood donation request." />
            </Helmet>
            <ViewDonationRequest />
          </>
        ),
      },
      {
        path: "/dashboard/volunteer-home",
        element: (
          <>
            <Helmet>
              <title>Volunteer Dashboard - Blood Donation</title>
              <meta name="description" content="Welcome to your volunteer dashboard." />
            </Helmet>
            <VolunteerDashboard />
          </>
        ),
      },
      {
        path: "/dashboard/volunteer-donation-request",
        element: (
          <>
            <Helmet>
              <title>Volunteer Donation Requests - Blood Donation</title>
              <meta name="description" content="View all donation requests assigned to you." />
            </Helmet>
            <VolunteerDonationRequests />
          </>
        ),
      },
    ],
  },
]);

export default router;
