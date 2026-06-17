import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/slices/authSlice";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect } from "react";
import { setUser as setUiUser } from "@/redux/slices/uiSlice";
import { setUser as setAuthUser } from "@/redux/slices/authSlice";
import { PROFILE } from "@/apiFunctions/apiEndPoints";

export const useUserProfile = () => {
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const axiosSecure = useAxiosSecure();

  const query = useQuery({
    queryKey: ["userProfile", token],
    queryFn: async () => {
      if (!token) return null;
      const res = await axiosSecure.get(PROFILE);
      // Backend returns details in res.data.data
      return res.data.data || res.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Sync with Redux whenever data is fetched
  useEffect(() => {
    if (query.data) {
      dispatch(setUiUser({ user: query.data }));
      dispatch(setAuthUser(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};
