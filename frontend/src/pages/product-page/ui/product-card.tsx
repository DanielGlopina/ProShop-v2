import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

import ProductRating from "@/features/products/product-rating";

import type { Product } from "@/features/products/type";
import { cartSlice } from "@/features/cart/cart.slice";
import { useAppDispatch, useAppSelector } from "@/app/store";

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    cartSlice.selectors.selectCartItem(state, product._id),
  );

  const handleAddToCart = () => {
    const { _id, name, image, price, countInStock } = product;

    dispatch(
      cartSlice.actions.addToCart({
        _id,
        name,
        image,
        price,
        countInStock,
      }),
    );
  };

  return (
    <Row>
      {/*=== Product Illustration ===*/}
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>

      {/*=== Central part ===*/}
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>

          <ListGroup.Item>
            <ProductRating
              value={product.rating || 0}
              text={`${product.numReviews} reviews`}
            />
          </ListGroup.Item>

          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
        </ListGroup>
      </Col>

      {/*=== Purchase cart ===*/}
      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  <strong>
                    ${product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                className="btn-blok"
                type="button"
                disabled={
                  product.countInStock === 0 ||
                  cartItem?.qty === product.countInStock
                }
                onClick={() => handleAddToCart()}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductCard;
