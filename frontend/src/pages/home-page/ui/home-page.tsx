import { Row, Col } from "react-bootstrap";
import { LuLoaderCircle } from "react-icons/lu";

import Product from "@/features/products/product-item";

import { useGetProductsQuery } from "@/features/products/api";
import ToastNotification from "@/shared/ui/toast-notification";

const HomePage = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError,
  } = useGetProductsQuery();

  return (
    <>
      <h1>Latest Products</h1>

      {isError && (
        <ToastNotification
          message={"Something went wrong while received products"}
          style="danger"
          visible
        />
      )}

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
