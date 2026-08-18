import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "@/redux/slices/authSlice";

const PrivateRoute = ({ allowedRoles, children }) => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If specific roles are required and user object is available
  if (allowedRoles && allowedRoles.length > 0 && user?.role && !allowedRoles.includes(user.role)) {
    if (user.role === "Host") {
      return <Navigate to="/host/dashboard" replace />;
    }
    return <Navigate to="/advertising/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
