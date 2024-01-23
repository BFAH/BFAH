const express = require("express");
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')('sk_test_51ObTM0E2Js1fhUcTLQKFNo2gHjPI1z5m8YuphzkhSTauoRW5NmuIipCBI80scv6gixoWPyHmznIkjK3mmGVYmpL100euiLRz6s');

router.post("/create-checkout-session", async (req, res, next) => {
  console.log("body", req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body,
      success_url: `${process.env.SERVER_URL}/confirmation`,
      cancel_url: `${process.env.SERVER_URL}/payment`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
