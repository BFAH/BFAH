const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = require('express').Router();


//Get All Products
router.get('/', async (req, res, next) => {
    try {
        const products = await prisma.products.findMAny();
        res.status(200).send(products);
    } catch (error) {
        console.error('ERROR - Could Not Fetch All Auction Products', error);
        res.status(500).json({ error: 'SERVER ERROR' });
    }
});

module.exports =  router;