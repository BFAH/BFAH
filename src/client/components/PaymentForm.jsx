import React from "react";
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  let location = useLocation();
  const handleCheckout = async () => {
    console.log("hit");

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ name: "ball", price: location.state, quantity: 1 }])  // isHighest will go here
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
