import React from "react";
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  let location = useLocation();
  const handleCheckout = async () => {
    console.log("hit");
    const {price} = location.state;

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ price: 'price_1ObafvE2Js1fhUcTb1q0GUH5',
        quantity: 1 }])  // isHighest will go here
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
      <button onClick={handleCheckout}>Checkout</button>
    </>
  );
};

export default PaymentForm;
