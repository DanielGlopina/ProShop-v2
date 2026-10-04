import { Col, Container, Row } from "react-bootstrap";

import CartSummary from "./cart-summary";

import { cartSlice } from "@/features/cart/model/cart.slice";
import { useAppSelector } from "@/app/store";
import CartItemsTable from "./cart-items-table";
import { transformCartItemsToArray } from "@/shared/utils/transformCartItemsToArray";

export default function SummaryPage() {
  const cartItemsRaw = useAppSelector(cartSlice.selectors.selectCartItems);
  const cartItems = transformCartItemsToArray(cartItemsRaw);

  return (
    <section className="h-100">
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          {/*=== Cart Items Table ===*/}
          {cartItems.length > 0 ? (
            <Col xs={12}>
              <CartItemsTable cartItems={cartItems} />
            </Col>
          ) : (
            <Col className="text-center text-2xl mb-5">Cart is empty</Col>
          )}

          {/*=== Cart Summary ===*/}
          <CartSummary cartItems={cartItems} />
        </Row>
      </Container>
    </section>
  );
}
