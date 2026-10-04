import { Row, Col } from "react-bootstrap";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";

import Product from "@/features/products/ui/product-item";

import { useGetProductsQuery } from "@/features/products/model/api";

const HomePage = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError,
  } = useGetProductsQuery();

  return (
    <>
      <h1>Latest Products</h1>

      {isError && toast.error("Something went wrong while received products")}

      {isLoadingProducts && (
        <LuLoaderCircle className="animate-spin mx-auto" size={50} />
      )}

      {products && (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
