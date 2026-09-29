import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

import type { CartItem } from "@/features/cart/types";
import { cartConfig } from "@/features/cart/cart.config";

const CartSummary = ({
  cartItemsEntries,
  productQtySum,
}: {
  cartItemsEntries: [string, CartItem][];
  productQtySum: number;
}) => {
  const navigate = useNavigate();

  const cartTotals = useMemo(() => {
    return cartItemsEntries.reduce((acc, curr) => {
      return acc + curr[1].price * curr[1].qty;
    }, 0);
  }, [cartItemsEntries]);

  return (
    <Card className="shadow mb-5 mb-lg-0" style={{ borderRadius: 16 }}>
      <Card.Body className="p-4">
        <Row>
          <Col>
            <div
              className="d-flex justify-content-between"
              style={{ fontWeight: 500 }}
            >
              <p className="mb-2">Subtotal</p>
              <p className="mb-2">${cartTotals.toFixed(2)}</p>
            </div>

            <div
              className="d-flex justify-content-between"
              style={{ fontWeight: 500 }}
            >
              <p className="mb-0">Shipping</p>
              <p className="mb-0">
                ${(cartTotals > 0 ? cartConfig.shippingPrice : 0).toFixed(2)}
              </p>
            </div>

            <hr className="my-4" />

            <div className="d-grid">
              <Button
                size="lg"
                disabled={productQtySum === 0}
                onClick={() => navigate("/shipping")}
              >
                <div className="d-flex justify-content-between">
                  <span>Checkout</span>
                  <span>
                    $
                    {(cartTotals > 0
                      ? cartTotals + cartConfig.shippingPrice
                      : cartTotals
                    ).toFixed(2)}
                  </span>
                </div>
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;
