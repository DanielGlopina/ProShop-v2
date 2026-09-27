import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import ProductRating from "./product-rating";

import type { Product } from "@/features/products/type";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <ProductRating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="div" style={{ marginBlock: "3px" }}>
          {product.countInStock > 0 ? (
            <div className="text-green-600">In stock</div>
          ) : (
            <div className="text-red-600">Out of stock</div>
          )}
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
