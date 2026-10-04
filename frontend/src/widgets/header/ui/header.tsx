import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { BsArrowDown } from "react-icons/bs";
import { BiDoorOpen, BiPlusCircle } from "react-icons/bi";

import { useAppSelector } from "@/app/store";
import { authSlice } from "@/features/auth/model/auth.slice";
import { cartSlice } from "@/features/cart/model/cart.slice";
import { logoutThunk } from "@/features/auth/model/auth.thunks";
import { useAppDispatch } from "@/app/store";
import logo from "@/shared/assets/logo.png";
import { transformCartItemsToArray } from "@/shared/utils/transformCartItemsToArray";
import { getTotalItemsQty } from "@/shared/utils/getTotalItemsQty";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(authSlice.selectors.selectUser);
  const isAuth = useAppSelector(authSlice.selectors.selectIsAuth);
  const cartItemsRaw = useAppSelector(cartSlice.selectors.selectCartItems);
  const cartItems = transformCartItemsToArray(cartItemsRaw);

  const cartItemsQty = useMemo(() => {
    return getTotalItemsQty(cartItems);
  }, [cartItems]);

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
                  {cartItems.length > 0 && (
                    <Badge bg="primary" pill className="ml-0.5">
                      {cartItemsQty}
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
                      className="border-0 bg-transparent flex align-items-center gap-2 px-0"
                    >
                      <FaUser />
                      <div className="flex items-center">
                        <span>{user.name}</span>
                        <BsArrowDown
                          className="fs-6"
                          style={{ transform: "translateY(1px)" }}
                        />
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {user.isAdmin && (
                        <Dropdown.Item
                          as={"button"}
                          onClick={() => navigate("/admin/addproduct")}
                        >
                          Add product <BiPlusCircle className="inline-block" />
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        as={"button"}
                        onClick={() => dispatch(logoutThunk())}
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
