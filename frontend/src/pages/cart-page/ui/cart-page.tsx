// import { useState } from "react";
import {
  Col,
  Container,
  Row,
} from "react-bootstrap";


import CartSummary from "./cart-summary";

import { cartSlice } from "@/features/cart/cart.slice";
import { useAppSelector } from "@/app/store";
import CartItemsTable from "./cart-items-table";


export default function SummaryPage() {
  const cartItemsRaw = useAppSelector(cartSlice.selectors.selectCartItems);
  const cartItemsEntries = Object.entries(cartItemsRaw);

  return (
    <section className="h-100">
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          {/*=== Cart Items Table ===*/}
          <Col xs={12}>
            <CartItemsTable cartItemsEntries={cartItemsEntries}/>
          </Col>

          {/*=== Cart Summary ===*/}
          <CartSummary cartItemsEntries={cartItemsEntries}/>
        </Row>
      </Container>
    </section>
  );
}
