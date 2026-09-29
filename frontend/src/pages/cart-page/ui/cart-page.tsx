// import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import CartSummary from "./cart-summary";

import { cartSlice } from "@/features/cart/model/cart.slice";
import { useAppSelector } from "@/app/store";
import CartItemsTable from "./cart-items-table";
import { useMemo } from "react";

export default function SummaryPage() {
  const cartItemsRaw = useAppSelector(cartSlice.selectors.selectCartItems);
  const cartItemsEntries = Object.entries(cartItemsRaw);

  const productsQtySum = useMemo(() => {
    return cartItemsEntries.reduce((acc, curr) => {
      return acc + curr[1].qty;
    }, 0);
  }, [cartItemsEntries]);

  return (
    <section className="h-100">
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          {/*=== Cart Items Table ===*/}
          {productsQtySum > 0 ? (
            <Col xs={12}>
              <CartItemsTable cartItemsEntries={cartItemsEntries} />
            </Col>
          ) : (
            <Col className="text-center text-2xl mb-5">Cart is empty</Col>
          )}

          {/*=== Cart Summary ===*/}
          <CartSummary
            cartItemsEntries={cartItemsEntries}
            productQtySum={productsQtySum}
          />
        </Row>
      </Container>
    </section>
  );
}
