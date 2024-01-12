const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = require('express').Router();


// ROUTE: api/products
// WHAT IT DOES: Returns all Auction Products in the database

router.get('/', async (req, res, next) => {
    try {
        const products = await prisma.products.findMany();
        res.status(200).send(products);
    } catch (error) {
        console.error('ERROR - Could Not Fetch All Auction Products', error);
        res.status(500).json({ error: 'SERVER ERROR' });
    }
});

module.exports =  router;