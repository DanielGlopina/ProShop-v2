import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import { useAppSelector } from "@/app/store";
import { authSlice } from "@/features/auth/model/auth.slice";
import { cartSlice } from "@/features/cart/model/cart.slice";
import logo from "@/shared/assets/logo.png";
import { useMemo } from "react";

const Header = () => {
  const isAuth = useAppSelector(authSlice.selectors.selectIsAuth);
  const cartItemsObj = useAppSelector(cartSlice.selectors.selectCartItems);

  const productsQtySum = useMemo(() => {
    const cartItemsEntries = Object.entries(cartItemsObj);

    return cartItemsEntries.reduce((acc, curr) => {
      return acc + curr[1].qty;
    }, 0);
  }, [cartItemsObj]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="ProShop Logo"
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
              />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {productsQtySum > 0 && (
                    <Badge bg="primary" pill className="ml-0.5">
                      {productsQtySum}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {isAuth ? (
                <div>
                  <Container>
                    <Nav.Link as={"button"}>
                      <FaUser /> Profile
                    </Nav.Link>
                  </Container>
                </div>
              ) : (
                <LinkContainer to="/auth/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
