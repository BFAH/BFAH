const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE);

const { verify } = require('../util')

// ROUTE: api/products
// WHAT IT DOES: Returns all Auction Products in the database

router.get("/", async (req, res, next) => {
  try {
    const products = await prisma.products.findMany();
    res.status(200).send(products);
  } catch (error) {
    console.error("ERROR - Could Not Fetch All Auction Products", error);
    res.status(500).json({ error: "SERVER ERROR" });
  }
});

//GET returns product by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: +id,
      },
    });
    res.status(201).send(product)

  } catch (err) {
    console.error("ERROR - Could not FETCH the PRODUCT you REQUESTED!", err);
    res.status(500).json({ err: "SERVER ERROR" });
  }
});

//POST creates a new product
router.post('/', verify, async (req, res, next) => {
  const { name, description, price, imageUrl, categoryId } = req.body;
  try {
    const stripeProduct = await stripe.products.create({
      name: name,
    })
    const stripePrice = await stripe.prices.create({
      currency: 'usd',
      unit_amount: price,
      product: stripeProduct.id,
    });

    const product = await prisma.products.create({
      data: {
        name,
        description,
        price,
        stripePriceId: stripePrice.id,
        imageUrl,
        categoryId
      }
    })
    console.log(product);
    res.status(201).send(product)
  } catch (err) {
    console.error("ERROR - Could not CREATE your new PRODUCT!", err);
    res.status(500).json({ err: "SERVER ERROR" });
  }
})

// DELETE deletes a product by ID (only allowed for admins)
router.delete("/:id", verify, async (req, res, next) => {
  const { id } = req.params;
  
  // Check if the user making the request is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Permission Denied. Only admins can delete products." });
  }

  try {
    const deletedProduct = await prisma.products.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).send(deletedProduct);
  } catch (err) {
    console.error("ERROR - Could not DELETE the PRODUCT!", err);
    res.status(500).json({ err: "SERVER ERROR" });
  }
});

module.exports = router;
