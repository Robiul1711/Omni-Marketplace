import AuthHeader from "@/pages/auth/AuthHeader";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <AuthHeader />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
