import AuthHeader from "@/pages/auth/AuthHeader";
import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <AuthHeader />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
