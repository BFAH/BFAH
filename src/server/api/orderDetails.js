const express = require("express");
const router = express.Router();


router.get("/get-order-details", (req, res) => {
    const orderDetails = {
      items: [
        { name: "ball", price: 1000, quantity: 1 },
        // Add more items as needed
      ],
      totalAmount: 1000, // Calculate the total amount based on the items
      // Add more order details as needed
    };
  
    res.json(orderDetails);
  });

module.exports = router;