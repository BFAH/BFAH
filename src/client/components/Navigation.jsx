import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import {
  Container,
  Form,
  Button,
  Navbar,
  Alert,
  AlertHeading,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";
import Login from "./Login";
import Logout from "./Logout";
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
  const [currentUser, setCurrentUser] = useState({});
  const [show, setShow] = useState(true);

  const handleLogout = () => {
    Logout();
    setLogoutMessage(() => {
      if (show) {
        return (
          <>
            <Alert variant="info" onClose={() => setShow(false)} dismissible>
              <AlertHeading>You logged out!</AlertHeading>
            </Alert>
          </>
        );
      }
    });
    setTimeout(() => {
      setLogoutMessage(null);
      navigate("/", { state: { flag: false } });
    }, 2000);
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get(`/api/users/current/user`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        const userInfo = result.data;
        setCurrentUser(userInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip
                  id="button-tooltip-2"
                  style={{ backgroundColor: "black", width: "1015px" }}
                >
                  <Image
                    style={{ width: "1000px" }}
                    src="/Logo_art-2.jpg"
                  />
                </Tooltip>
              }
            >
              {({ ref, ...triggerHandler }) => (
                <Button
                  variant="light"
                  {...triggerHandler}
                  className="d-inline-flex align-items-center"
                >
                  <Image
                    ref={ref}
                    style={{ width: "1000px", border: "black double 10px" }}
                    src="/Logo_art.jpg"
                  />
                  <span className="ms-1"></span>
                </Button>
              )}
            </OverlayTrigger>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/sell">Sell My Stuff!</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              {logoutMessage}
            </Nav>
            {!currentUser.username ? (
              <Login />
            ) : (
              <Navbar.Text style={{ marginRight: "20px" }}>
                Signed in as: <a href="/login">{currentUser.username}</a>
              </Navbar.Text>
            )}
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
          path="/confirmation/:id"
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