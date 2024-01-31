import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  const [priceData, setPriceData] = useState('');
  const [buyerData, setBuyerData] = useState('');
  const [productData, setProductData] = useState();
  const [sellerId, setSellerId] = useState('');
  const [sellerData, setSellerData] = useState('');
  const [sellerStripeAcct, setSellerStripeAcct] = useState({});
  const [stripePrice, setStripePrice] = useState('');
  const location = useLocation();

  useEffect(()=> {
    let auctionId = location.state.auctionId;
    console.log(auctionId);
  
    const getData = async() => {
      try {
        const response2 = await axios.get(`/api/auctions/${+auctionId}`);
        const response3 = await axios.get("/api/users/current/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        setPriceData(response2.data.currentBidPrice);
        setProductData(response2.data.products.name);
        setBuyerData(response3.data.username);
        setStripePrice(response2.data.products.stripePriceId);
        setSellerId(response2.data.userId);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  },[]);

  useEffect(()=>{
    const getSeller = async() => {
      try {
        const response = await axios.get(`/api/users/${+sellerId}`);
        console.log(response.data);
        setSellerData(response.data);
        setSellerStripeAcct(response.data.stripeAccount);
      } catch (error) {
        console.log(error)
      }
    }
    getSeller();
  },[]);

  const handleCheckout = async () => {
    let auctionId = location.state.auctionId;
    
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: stripePrice,
        quantity: 1, stripeAcct: sellerStripeAcct })  
      });

      const response1= await axios.patch(`/api/auctions/winner/complete/${+auctionId}`)

      if (!response.ok) {
        const json = await response.json();
        throw json;
      }

      const { url } = await response.json();

      window.location = url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div>
      <h2>Seller Username: {sellerData.username}</h2>
      <h2>Purchase Item:{productData}</h2>
      <h2>Purchase Price: ${priceData}</h2>
      <h2>Buyer Username: {buyerData}</h2>
    </div>
      <button onClick={handleCheckout}>Pay Now</button>
    </>
  );
};

export default PaymentForm;
