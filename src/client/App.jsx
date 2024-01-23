import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import AccountInfo from "./components/AccountInfo";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import SingleProduct from "./components/SingleProduct";
import AllProducts from "./components/AllProducts";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Auction from "./components/Auction";
import PaymentForm from "./components/PaymentForm";
import ShippingForm from "./components/ShippingForm";
import Confirmation from "./components/Confirmation";


function App() {


  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<AllProducts />} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route path="/:id" element={<SingleProduct />} />
        <Route path='/shipping' element={<ShippingForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path='/sell' element={<Auction />} />
      </Routes>
    </>
  );
}

export default App;