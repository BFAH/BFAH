import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";
import { Link, useNavigate } from "react-router-dom";
import Auction from "./Auction";
import PaymentForm from "./PaymentForm";

const AllProducts = () => {
  const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState(null);
  const [auctionData, setAuctionData] = useState();
  const [seller, setSeller] =useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        const response2 = await axios.get(`/api/auctions`);
        setAuctionData(response2.data);
        console.log(auctionData);
      } catch (error) {
        console.error("ERROR - Could Not Fetch All Products", error);
      }
    };
    fetchAllProducts();
  }, []);
  console.log(auctionData)

  if(auctionData){   
    for(let auction of auctionData) {
        products[auction.productId-1].bidTime = new Date(auction.bidEndTime).toLocaleString();
        products[auction.productId-1].currentBid = auction.currentBidPrice;
        products[auction.productId-1].sellerId = auction.userId;
    }
  }
  
  const handleBuyNow = (price1, sellerId) => {
    console.log(price1);
    if(confirm("Confirm Buy Now")) {
      return navigate("/payment", { state: {price: price1, seller:sellerId }});
    }
  }

  return (
    <div className="all-products">
      <img src="./Logo_art.jpg" style={{width: "900px", border:"black double 10px"}}/>
      <div className="main">
        <FilterBar products={products} setFiltered={setFiltered} />
        {filtered ? (
          <div className="cards">
            {filtered &&
              filtered.map((product) => {
                return (
                  <div key={product.id}>
                    <div style={{position:"relative", top:"85%",left:"10px", zIndex:"2"}}>
                          <button onClick={()=>handleBuyNow(product.stripePriceId)}>Buy Now</button>:${product.price}</div>
                    <Link
                      to={`/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          height: "380px",
                          width: "300px",
                          border: "black solid 4px",
                          margin: "20px",
                          backgroundColor: "#def2f1",
                          color: "black",
                        }}
                      >
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <img
                          src={product.imageUrl}
                          style={{ height: "100px", width: "100px" }}
                        />
                        <h4>Current Bid: ${product.currentBid}</h4>
                        <h5>Bid End: {product.bidTime}</h5>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="cards">
            {products &&
              products.map((product) => {
                return (
                  <div key={product.id}>
                    <div style={{position:"relative", top:"85%",left:"10px", zIndex:"2"}}>
                          <button onClick={()=>handleBuyNow(product.stripePriceId, product.sellerId)}>Buy Now</button>:${product.price}</div>
                    <Link
                      to={`/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          height: "380px",
                          width: "300px",
                          border: "black solid 4px",
                          margin: "20px",
                          backgroundColor: "#def2f1",
                          color: "black",
                        }}
                      >
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <img
                          src={product.imageUrl}
                          style={{ height: "100px", width: "100px" }}
                        />
                        
                        <h4>Current Bid: ${product.currentBid}</h4>
                        <h5>Bid End: {product.bidTime}</h5>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
