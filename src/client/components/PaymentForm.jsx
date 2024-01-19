import React from "react";

const PaymentForm = () => {
  async function handleCheckout() {
    console.log("hit");
    await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          /*isHighest*/
        },
      ]),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        // this is where we manipulate the data vv
        //  await axios.get("/create-order")
        window.location = url;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <button onClick={handleCheckout}>Checkout</button>
    </>
  );
};

export default PaymentForm;
