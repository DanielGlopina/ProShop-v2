import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { cloudinary } from "@/shared/cloudinary";
import type { Order } from "@/features/orders/types";

type OrderDetailsProps = {
  order: Order;
  isPending: boolean;
  handleClick: () => Promise<void | {
    redirectURL?: string | undefined;
  }>;
  error: Error | null;
};

const OrderDetails = ({
  order,
  isPending,
  handleClick,
  error,
}: OrderDetailsProps) => {
  return (
    <>
      <h1>Order: {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order?.contacts.name}
              </p>
              <p>
                <strong>Email: </strong> {order?.contacts.email}
              </p>
              <p>
                <strong>Address: </strong> {order?.shippingAddress.address},{" "}
                {order?.shippingAddress.city},{" "}
                {order?.shippingAddress.postalCode},{" "}
                {order?.shippingAddress.country}
              </p>
              {order?.isDelivered ? (
                <strong className="text-green-600">
                  Delivered on {order?.deliveredAt?.toString()}
                </strong>
              ) : (
                <strong className="text-red-500">Not Delivered</strong>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <strong className="text-green-600">
                  Paid on {order?.paidAt?.toString()}
                </strong>
              ) : (
                <strong className="text-red-500">Not Paid</strong>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2}>
                      <Image src={cloudinary(item.image).myImage.toURL()} />
                    </Col>
                    <Col>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} X ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>

                {order.paymentMethod === "PayPal" && !order.isPaid && (
                  <paypal-button
                    onClick={() => handleClick()}
                    disabled={isPending || !order._id || !!error}
                    className="flex mx-auto mt-5"
                  >
                    Pay with PayPal
                  </paypal-button>
                )}
                {/* MARK AS DELIVERED PLACEHOLDER */}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetails;
