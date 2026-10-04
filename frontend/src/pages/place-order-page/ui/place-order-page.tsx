import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";

import CheckoutSteps from "@/shared/ui/checkout-steps";

import { cartSlice } from "@/features/cart/model/cart.slice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useCreateOrderMutation } from "@/features/orders/model/api";
import { getCartTotals } from "@/shared/utils/getCartTotals";
import { cartConfig } from "@/features/cart/cart.config";
import { transformCartItemsToArray } from "@/shared/utils/transformCartItemsToArray";
import { cloudinary } from "@/shared/cloudinary";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItemsRaw = useAppSelector(cartSlice.selectors.selectCartItems);
  const cartItems = transformCartItemsToArray(cartItemsRaw);
  const contacts = useAppSelector(cartSlice.selectors.selectContacts);
  const shippingAddress = useAppSelector(
    cartSlice.selectors.selectShippingAddress,
  );
  const paymentMethod = useAppSelector(cartSlice.selectors.selectPaymentMethod);
  const cartTotals = getCartTotals(cartItems);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping", { replace: true });
    } else if (!contacts) {
      navigate("/contacts", { replace: true });
    }
  }, [shippingAddress, contacts, navigate]);

  const placeOrderHandler = async () => {
    if (!shippingAddress || !contacts) return;

    try {
      const res = await createOrder({
        contacts,
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cartTotals,
        shippingPrice: cartConfig.shippingPrice,
        totalPrice: cartTotals + cartConfig.shippingPrice,
      }).unwrap();

      toast.success("Order create successfully");

      dispatch(cartSlice.actions.clearCart());
      navigate(`/order/${res._id}`);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to create an order. Please, try later!";
      toast.message(message);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress?.address}, {shippingAddress?.city},
                {shippingAddress?.postalCode}, {shippingAddress?.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <strong>
                {cartItems.length === 0 ? (
                  <strong>Your cart is empty</strong>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={cloudinary(item.image).myImage.toURL()}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col className="my-auto">
                            <Link to={`/products/${item._id}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4} className="my-auto">
                            {item.qty} x ${item.price} = $
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </strong>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cartTotals.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cartConfig.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    ${(cartTotals + cartConfig.shippingPrice).toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                >
                  Place Order{" "}
                  {isLoading && (
                    <LuLoaderCircle
                      className="inline-block animate-spin mx-auto"
                      size={20}
                    />
                  )}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
