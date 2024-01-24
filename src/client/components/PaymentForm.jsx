import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  const [sellerData, setSellerData] = useState();
  let location = useLocation();
  let stripePriceId = location.state;
  const seller = stripePriceId.seller;
  console.log(stripePriceId, seller);

  useEffect(()=> {
    const getSellerData = async() => {
      try {
        const response2 = await axios.get(`/api/users/${seller}`);
        setSellerData(response2.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSellerData();
  },[]);
  console.log(sellerData);
  const handleCheckout = async () => {
    try {
      // const shippingInfoCheck = await axios.get("api/users/shipping-info", {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      //   },
      // });

      // const hasShippingInfo = shippingInfoCheck.data;

      // if (!hasShippingInfo) {
      //   window.location = "/shipping";
      //   return;
      // }

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

      // Manipulate the data here if needed
      // await axios.get("/create-order");

      window.location = url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={handleCheckout}>Pay Now</button>
    </>
  );
};

export default PaymentForm;
