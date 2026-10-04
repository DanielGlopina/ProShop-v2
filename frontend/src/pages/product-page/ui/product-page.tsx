import { Link, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";

import { useGetProductQuery } from "@/features/products/model/api";
import { getErrorMessage } from "@/shared/get-error-message";
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

      {isError && toast.error(getErrorMessage(error))}

      {isProductLoading && (
        <LuLoaderCircle className="animate-spin mx-auto" size={50} />
      )}

      {product && <ProductCard product={product} />}
    </>
  );
};

export default ProductPage;
