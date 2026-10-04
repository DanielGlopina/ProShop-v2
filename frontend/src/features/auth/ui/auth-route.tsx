import { Navigate, Outlet } from "react-router-dom";

import { authSlice } from "../model/auth.slice";
import { useAppSelector } from "@/app/store";

const AuthRoute = () => {
  const isAuth = useAppSelector(authSlice.selectors.selectIsAuth);

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
