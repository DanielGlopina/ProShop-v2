import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({
  step1,
  step2,
  step3,
  step4,
}: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/shipping">
            <Nav.Link className="px-1">Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="px-1" disabled>
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <div className="h-[1px] w-4 bg-black my-auto"></div>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/contacts">
            <Nav.Link className="px-1">Contacts</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="px-1" disabled>
            Contacts
          </Nav.Link>
        )}
      </Nav.Item>

      <div className="h-[1px] w-4 bg-black my-auto"></div>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link className="px-1">Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="px-1" disabled>
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <div className="h-[1px] w-4 bg-black my-auto"></div>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link className="px-1">Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="px-1" disabled>
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
