import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import AllProducts from "./components/AllProducts";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Auction from "./components/Auction";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        
      </div>
      <h1>Big Fancy Auction House</h1>
      </div>
  );
}

export default App;
