import { createBrowserRouter } from "react-router-dom";

import Layout from "@/shared/ui/layout";
import { HomePage } from "@/pages/home-page";
import { ProductPage } from "@/pages/product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
    ],
  },
]);
