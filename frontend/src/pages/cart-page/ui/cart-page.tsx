import { useState } from "react";
import { cartSlice } from "@/features/cart/cart.slice";
import { useAppSelector } from "@/app/store";

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

type PaymentMethod = "credit" | "debit" | "paypal";

const PAYMENT_METHODS = [
  { id: "credit", label: "Credit Card", Icon: FaCcMastercard },
  { id: "debit", label: "Debit Card", Icon: FaCcVisa },
  { id: "paypal", label: "PayPal", Icon: FaCcPaypal },
] as const;

const BOLD = { fontWeight: 500 } as const;

export default function SummaryPage() {
  const [payment, setPayment] = useState<PaymentMethod>("credit");

  const cartItemsRaw = useAppSelector(cartSlice.selectors.selectCartItems);
  const cartItemsEntries = Object.entries(cartItemsRaw);

  return (
    <section className="h-100">
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col xs={12}>
            {/*=== Items table ===*/}
            <Table responsive>
              <thead>
                <tr>
                  <th scope="col" className="h5 ">
                    Shopping Cart
                  </th>

                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>

              <tbody>
                {cartItemsEntries &&
                  cartItemsEntries.map((entrie) => {
                    const id = entrie[0];
                    const item = entrie[1];

                    return (
                      <tr key={id}>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <Image
                              src={item.image}
                              rounded
                              fluid
                              style={{ width: 120 }}
                              alt="Book"
                            />
                            <div className="flex-column ms-4">
                              <p className="mb-2 text-left">{item.name}</p>
                            </div>
                          </div>
                        </th>

                        <td className="align-middle">
                          <div className="d-flex flex-row align-items-center">
                            <Button variant="link" className="px-2">
                              <FaMinus />
                            </Button>
                            <Form.Control
                              min={1}
                              type="number"
                              size="sm"
                              style={{ width: 60 }}
                              value={item.qty}
                            />
                            <Button variant="link" className="px-2">
                              <FaPlus />
                            </Button>
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="mb-0" style={BOLD}>
                            ${item.price}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>

          <Card className="shadow mb-5 mb-lg-0" style={{ borderRadius: 16 }}>
            <Card.Body className="p-4">
              <Row>
                {/* Totals */}
                <Col>
                  <div className="d-flex justify-content-between" style={BOLD}>
                    <p className="mb-2">Subtotal</p>
                    <p className="mb-2">$23.49</p>
                  </div>

                  <div className="d-flex justify-content-between" style={BOLD}>
                    <p className="mb-0">Shipping</p>
                    <p className="mb-0">$2.99</p>
                  </div>

                  <hr className="my-4" />

                  <div
                    className="d-flex justify-content-between mb-4"
                    style={BOLD}
                  >
                    <p className="mb-2">Total (tax included)</p>
                    <p className="mb-2">$26.48</p>
                  </div>

                  <div className="d-grid">
                    <Button size="lg">
                      <div className="d-flex justify-content-between">
                        <span>Checkout</span>
                        <span>$26.48</span>
                      </div>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </section>
  );
}
