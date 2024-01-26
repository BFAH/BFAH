import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  const [priceData, setPriceData] = useState('');
  const [buyerData, setBuyerData] = useState('');
  const [productData, setProductData] = useState();
  const location = useLocation();

  useEffect(()=> {
    let stripePriceId = location.state;
    const seller = stripePriceId.seller;
    console.log(stripePriceId, seller);
  
    const getData = async() => {
      try {
        const response2 = await axios.get(`/api/users/${seller}`);
        const response3 = await axios.get("/api/users/current/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        setPriceData(response2.data.Auctions[0].products.price);
        setProductData(response2.data.Auctions[0].products.name);
        setBuyerData(response3.data.username);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  },[]);
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: stripePriceId.price,
        quantity: 1, stripeAcct: sellerData.stripeAccount })  
      });

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
      <h2>Buy Now Item:{productData}</h2>
      <h2>Buy Now Price: ${priceData}</h2>
      <h2>Buyer Username: {buyerData}</h2>
    </div>
      <button onClick={handleCheckout}>Pay Now</button>
    </>
  );
};

export default PaymentForm;
