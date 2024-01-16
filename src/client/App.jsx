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

function App() {

  return (
    <Routes>
          <Route path='/' element={<AllProducts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account-info" element={<AccountInfo />} />
          <Route path="/:id" element={<SingleProduct />} />

    </Routes>

  );
}

export default App;