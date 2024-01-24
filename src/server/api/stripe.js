const express = require("express");
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE);

router.post("/create-checkout-session", async (req, res, next) => {
  console.log("body", req.body);
  const {price, quantity, stripeAcct} = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items:[ 
        {
          price:price,
          quantity:quantity,
        }],
      
      success_url: `${process.env.SERVER_URL}/confirmation`,
      cancel_url: `${process.env.SERVER_URL}/payment`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
