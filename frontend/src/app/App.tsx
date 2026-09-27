import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { useAppDispatch } from "./store";
import { checkAuthThunk } from "@/features/auth/model/auth.thunks";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuthThunk());
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
