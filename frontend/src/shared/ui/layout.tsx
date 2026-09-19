import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

import Footer from "./footer";
import Header from "./header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
