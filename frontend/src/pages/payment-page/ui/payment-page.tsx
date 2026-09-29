import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";

import FormContainer from "@/shared/ui/form-container";
import CheckoutSteps from "@/shared/ui/checkout-steps";

import { cartSlice } from "@/features/cart/model/cart.slice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import type { PaymentMethod } from "@/features/cart/types";

const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PayPal");
  const shippingAddress = useAppSelector(
    cartSlice.selectors.selectShippingAddress,
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(cartSlice.actions.savePaymentMethod({ paymentMethod }));
    navigate("/placeorder");
  };

  useEffect(() => {
    Object.entries(shippingAddress).forEach((pair) => {
      if (pair[1] === "") {
        navigate("/shipping");
      }
    });
  });

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label as={"legend"}>Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) =>
                setPaymentMethod(e.target.value as PaymentMethod)
              }
            />

            <Form.Check
              type="radio"
              className="my-2"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked
              onChange={(e) =>
                setPaymentMethod(e.target.value as PaymentMethod)
              }
            />

            <Form.Check
              type="radio"
              className="my-2"
              label="Cash On Delivery"
              id="COD"
              name="paymentMethod"
              value="COD"
              checked
              onChange={(e) =>
                setPaymentMethod(e.target.value as PaymentMethod)
              }
            />
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
