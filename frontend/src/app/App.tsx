import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { LuLoaderCircle } from "react-icons/lu";
import { PayPalProvider } from "@paypal/react-paypal-js/sdk-v6";

import { router } from "./router";
import { useAppDispatch, useAppSelector } from "./store";
import { checkAuthThunk } from "@/features/auth/model/auth.thunks";
import { authSlice } from "@/features/auth/model/auth.slice";
import { useLoadPayPalConfigQuery } from "@/features/orders/model/api";

const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(authSlice.selectors.selectIsInitialized);
  const { data: paypalConfig, isLoading: isConfigLoading } =
    useLoadPayPalConfigQuery();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(checkAuthThunk());
      return;
    }

    dispatch(authSlice.actions.setInitialized(true));
  }, [dispatch]);

  if (!isInitialized && isConfigLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <LuLoaderCircle className="animate-spin mx-auto" size={50} />
      </div>
    );
  }

  return (
    <PayPalProvider
      clientId={paypalConfig?.clientId}
      environment={paypalConfig?.env ?? "sandbox"}
      components={["paypal-payments"]}
      pageType="checkout"
    >
      <RouterProvider router={router} />
    </PayPalProvider>
  );
};

export default App;
