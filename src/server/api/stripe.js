const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE);

router.post("/create-checkout-session", async (req, res, next) => {
  console.log("body", req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.ceil(item.price * 1.0725),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.SERVER_URL}/confirmation`,
      cancel_url: `${process.env.SERVER_URL}/payment`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
