import React, { useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Nav from "react-bootstrap/Nav";
import Register from "./Register";
import AccountInfo from "./AccountInfo";
import SingleProduct from "./SingleProduct";
import AllProducts from "./AllProducts";
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
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <Nav justify variant="tabs" defaultActiveKey="/home">
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
        </Nav.Item>
      </Nav>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <AccountInfo />
              <AllProducts />
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
              <SingleProduct />
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
