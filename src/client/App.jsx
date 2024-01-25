import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AccountInfo from "./components/AccountInfo";
import Navigation from "./components/Navigation";
import SingleProduct from "./components/SingleProduct";
import AllProducts from "./components/AllProducts";
import Auction from "./components/Auction";
import PaymentForm from "./components/PaymentForm";
import ShippingForm from "./components/ShippingForm";
import Confirmation from "./components/Confirmation";
import UserStore from "./components/UserStore";

function App() {
  return (
    <>
      <img
        src="./Logo_art.jpg"
        style={{ width: "900px", border: "black double 10px" }}
      />
      <Navigation />
      <Routes>
        <Route path="/" element={<div><AccountInfo/><AllProducts /></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route path="/:id" element={<div><AccountInfo/><SingleProduct /></div>} />
        <Route path="/shipping" element={<div><AccountInfo/><ShippingForm /></div>} />
        <Route path="/payment" element={<div><AccountInfo/><PaymentForm /></div>} />
        <Route path="/confirmation" element={<div><AccountInfo/><Confirmation /></div>} />
        <Route path="/sell" element={<div><AccountInfo/><Auction /></div>} />
        <Route path="/store/:id" element={<div><AccountInfo/><UserStore /></div>} />
      </Routes>
    </>
  );
}

export default App;
