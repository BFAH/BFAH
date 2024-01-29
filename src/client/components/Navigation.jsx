import React, { useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Nav from "react-bootstrap/Nav";
import { Container, Form, Button, Navbar, NavDropdown } from "react-bootstrap";
import Register from "./Register";
import AccountInfo from "./AccountInfo";
import SingleAuction from "./SingleAuction";
import AllAuctions from "./AllAuctions";
import Auction from "./Auction";
import PaymentForm from "./PaymentForm";
import ShippingForm from "./ShippingForm";
import Confirmation from "./Confirmation";
import UserStore from "./UserStore";

const Navigation = () => {
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState(false);

  const handleLogout = () => {
    Logout();
    setLogoutMessage(
      "Successfully logged out! Click OK to go back to the Homepage"
    );
    setTimeout(() => {
      setLogoutMessage(null);
      navigate("/",{state:{flag:false}});
    }, 2000);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand><img
        src="./Logo_art.jpg"
        style={{ width: "900px", border: "black double 10px" }}
      /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Register/Login</Nav.Link>
            <Nav.Link href="/sell">Sell My Stuff!</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            {logoutMessage && window.alert(logoutMessage)}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-warning">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <AccountInfo />
              <AllAuctions />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route
          path="/:id"
          element={
            <div>
              <AccountInfo />
              <SingleAuction />
            </div>
          }
        />
        <Route
          path="/shipping"
          element={
            <div>
              <AccountInfo />
              <ShippingForm />
            </div>
          }
        />
        <Route
          path="/payment"
          element={
            <div>
              <AccountInfo />
              <PaymentForm />
            </div>
          }
        />
        <Route
          path="/confirmation"
          element={
            <div>
              <AccountInfo />
              <Confirmation />
            </div>
          }
        />
        <Route
          path="/sell"
          element={
            <div>
              <AccountInfo />
              <Auction />
            </div>
          }
        />
        <Route
          path="/store/:id"
          element={
            <div>
              <AccountInfo />
              <UserStore />
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default Navigation;

{
  /* <nav>
  <Link to="/">
    <button>Home</button>
  </Link>
  <Link to="/login">
    <button>Login</button>
  </Link>
  <Link to="/sell">
    <button>Sell</button>
  </Link>
  <button onClick={handleLogout}>Logout</button>
  {logoutMessage && window.alert(logoutMessage)}
  <form>
    <input type="text" placeholder="Search..." />
    <button type="submit">Go!</button>
  </form>
</nav>; */
}
{/* <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/" eventKey="link-1">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login" eventKey="link-1">
            Login/Register
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/sell" eventKey="link-1">
            Sell my stuff!
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={handleLogout}>
            Logout
          </Nav.Link>
          {logoutMessage && window.alert(logoutMessage)}
        </Nav.Item>
      </Nav> */}