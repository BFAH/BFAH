const express = require("express");
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE);

router.post("/create-checkout-session", async (req, res, next) => {
  const {price, quantity, stripeAcct, auctionId} = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items:[ 
        {
          price:price,
          quantity:quantity,
        }],
        payment_intent_data: {
          transfer_data: {
            destination: stripeAcct,
          },
        },
        success_url: `${process.env.SERVER_URL}/confirmation/${+auctionId}`,
        cancel_url: `${process.env.SERVER_URL}/payment`,
      });
      res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/update/price", async (req, res, next) => {
  const {bidPrice, product} = req.body;
  try {
    const response = await stripe.prices.create(
      { currency: 'usd',
        unit_amount: +bidPrice*100,
        product:product});
      res.send(response);
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;