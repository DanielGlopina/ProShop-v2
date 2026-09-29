import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { LuLoaderCircle } from "react-icons/lu";

import { router } from "./router";
import { useAppDispatch, useAppSelector } from "./store";
import { checkAuthThunk } from "@/features/auth/model/auth.thunks";
import { authSlice } from "@/features/auth/model/auth.slice";

const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(authSlice.selectors.selectIsInitialized);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(checkAuthThunk());
      return;
    }

    dispatch(authSlice.actions.setInitialized(true));
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <LuLoaderCircle className="animate-spin mx-auto" size={50} />
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
