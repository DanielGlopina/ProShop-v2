import { Navigate, Outlet } from "react-router-dom";

import { authSlice } from "../model/auth.slice";
import { useAppSelector } from "@/app/store";

const AdminRoute = () => {
  const isAdmin = useAppSelector(authSlice.selectors.selectIsAdmin);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
