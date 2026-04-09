import Dashboard from "@/components/admin/Dashboard";
import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import Layout from "@/layout/Layout";
import Home from "@/pages/sites/Home";
import Choose from "@/pages/auth/Choose";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import { OnBoardHost } from "@/pages/auth/hostAuth/OnBoardHost";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import ResetPassword from "@/pages/auth/ResetPassword";
import BrowsePlacement from "@/pages/sites/BrowsePlacement";
import BrowsePlacementMap from "@/pages/sites/BrowsePlacementMap";
import { createBrowserRouter } from "react-router-dom";
import PlacementDetails from "@/pages/sites/PlacementDetails";
import BookingProcess from "@/pages/sites/BookingProcess";
import UnderDevelopment from "@/pages/sites/UnderDevelopment";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "choose",
        element: <Choose />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "onboard-host",
        element: <OnBoardHost />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/browse-placements",
        element: <BrowsePlacement />,
      },
      {
        path: "/browse-placements-map",
        element: <BrowsePlacementMap />,
      },
      {
        path: "/placement/:id",
        element: <PlacementDetails />,
      },
    ],
  },
  {
    path: "/booking-process",
    element: <BookingProcess />,
  },
  // Admin routes
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <UnderDevelopment />,
  },
]);

export default router;
