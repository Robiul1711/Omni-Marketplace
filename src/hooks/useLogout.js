import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { clearAuth } from "@/redux/slices/authSlice";
import { clearUiState } from "@/redux/slices/uiSlice";
import { LOGOUT } from "@/apiFunctions/apiEndPoints";

export const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const logout = async (options = {}) => {
    const { redirect = "/auth/login", silent = false } = options;
    setIsLoggingOut(true);

    try {
      // Hit POST /auth/logout
      await axiosSecure.post(LOGOUT);
    } catch (err) {
      console.warn("Logout API call failed or already invalid:", err?.response?.data || err?.message);
    } finally {
      // Guarantee frontend state cleanup regardless of backend response
      dispatch(clearAuth());
      dispatch(clearUiState());
      queryClient.clear();
      setIsLoggingOut(false);

      if (!silent) {
        toast.success("Logged out successfully");
      }

      if (redirect) {
        navigate(redirect);
      }
    }
  };

  return { logout, isLoggingOut };
};

export default useLogout;
