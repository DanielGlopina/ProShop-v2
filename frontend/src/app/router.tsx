import { createBrowserRouter } from "react-router-dom";

import AuthRoute from "@/features/auth/ui/auth-route";
import AdminRoute from "@/features/auth/ui/admin-route";
import Layout from "@/shared/ui/layout";
import { AuthPage } from "@/pages/auth-page";
import { HomePage } from "@/pages/home-page";
import { ProductPage } from "@/pages/product-page";
import { CartPage } from "@/pages/cart-page";
import { ShippingPage } from "@/pages/shipping-page";
import { PaymentPage } from "@/pages/payment-page";
import { PlaceOrderPage } from "@/pages/place-order-page";
import { AddProductPage } from "@/pages/add-product-page";
import { OrderPage } from "@/pages/order-page";

import { store } from "./store";
import { productsApi } from "@/features/products/model/api";
import { ContactsPage } from "@/pages/contacts-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: async () => {
          store.dispatch(
            productsApi.util.prefetch("getProducts", undefined, {
              force: false,
            }),
          );
          return null;
        },
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
        loader: async ({ params }) => {
          store.dispatch(
            productsApi.util.prefetch("getProduct", params.id!, {
              force: false,
            }),
          );
          return null;
        },
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/shipping",
        element: <ShippingPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/contacts",
        element: <ContactsPage />,
      },
      {
        path: "/placeorder",
        element: <PlaceOrderPage />,
      },
      {
        path: "/order/:id",
        element: <OrderPage />,
      },
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          {
            path: "/admin/addproduct",
            element: <AddProductPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthRoute />,
    children: [
      {
        path: "/auth/:mode",
        element: <AuthPage />,
      },
    ],
  },
]);
