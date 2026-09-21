import { createBrowserRouter } from "react-router-dom";

import Layout from "@/shared/ui/layout";
import { HomePage } from "@/pages/home-page";
import { ProductPage } from "@/pages/product-page";
import { CartPage } from "@/pages/cart-page";

import { store } from "./store";
import { productsApi } from "@/features/products/api";

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
    ],
  },
]);
