import { Link, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { LuLoaderCircle } from "react-icons/lu";

import ToastNotification from "@/shared/ui/toast-notification";

import { useGetProductQuery } from "@/features/products/api";
import { getErrorMessage } from "@/shared/getErrorMessage";
import ProductCard from "./product-card";

const ProductPage = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading: isProductLoading,
    isError,
    error,
  } = useGetProductQuery(id ?? skipToken);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isError && (
        <ToastNotification
          message={getErrorMessage(error)}
          style="danger"
          visible
        />
      )}

      {isProductLoading && (
        <LuLoaderCircle className="animate-spin mx-auto" size={50} />
      )}

      {product && <ProductCard product={product} />}
    </>
  );
};

export default ProductPage;
