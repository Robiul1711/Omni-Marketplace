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
import HostDetaolsPage from "@/pages/sites/HostDetaolsPage";
import AdvertisingLayout from "@/layout/AdminLayout";
import Dashboard from "@/pages/advertisingSites/Dashboard";
import MyCampaigns from "@/pages/advertisingSites/MyCampaigns";
import SavedPlacements from "@/pages/advertisingSites/SavedPlacements";
import PaymentHistory from "@/pages/advertisingSites/PaymentHistory";
import Settings from "@/pages/advertisingSites/Settings";
import CampaignDetails from "@/pages/advertisingSites/CampaignDetails";

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
      {
        path: "/host/:id",
        element: <HostDetaolsPage />,
      },
    ],
  },
  {
    path: "/booking-process",
    element: <BookingProcess />,
  },
  // Admin routes
  {
    path: "/advertising/dashboard",
    element: <AdvertisingLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "my-campaigns",
        element: <MyCampaigns />,
      },
      {
        path: "saved-placements",
        element: <SavedPlacements />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "campaign/:id",
        element: <CampaignDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <UnderDevelopment />,
  },
]);

export default router;
