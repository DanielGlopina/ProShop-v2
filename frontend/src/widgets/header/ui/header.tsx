import { useMemo } from "react";
import { Navbar, Nav, Container, Badge, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { BiDoorOpen } from "react-icons/bi";

import { useAppSelector } from "@/app/store";
import { authSlice } from "@/features/auth/model/auth.slice";
import { cartSlice } from "@/features/cart/model/cart.slice";
import { logoutThunk } from "@/features/auth/model/auth.thunks";
import { useAppDispatch } from "@/app/store";
import logo from "@/shared/assets/logo.png";
import { BsArrowDown } from "react-icons/bs";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(authSlice.selectors.selectUser);
  const isAuth = useAppSelector(authSlice.selectors.selectIsAuth);
  const cartItemsObj = useAppSelector(cartSlice.selectors.selectCartItems);

  const productsQtySum = useMemo(() => {
    const cartItemsEntries = Object.entries(cartItemsObj);

    return cartItemsEntries.reduce((acc, curr) => {
      return acc + curr[1].qty;
    }, 0);
  }, [cartItemsObj]);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

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
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="button"
                      bsPrefix="nav-link"
                      id="profile-dropdown"
                      className="border-0 bg-transparent d-flex align-items-center gap-2 px-0"
                    >
                      <span>{user.name}</span>
                      <BsArrowDown
                        className="fs-6"
                        style={{ transform: "translateY(1px)" }}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={"button"}
                        onClick={() => handleLogout()}
                        style={{ color: "red", fontWeight: "600" }}
                      >
                        Logout <BiDoorOpen className="inline-block" />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
