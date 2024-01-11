const express = require('express');
const router = express.Router();
const AuctionService = require('../services/auctionService');

router.get('/allAuctionProducts', async (req, res, next) => {
    try{
    const allAuctionProducts = await AuctionService.getAllAuctionProducts();            // AuctionService function grabs all products
        res.json(allAuctionProducts);
} catch (error) {
    console.error('ERROR - Could Not Fetch All Auction Products', error);
    res.status(500).json({ error: 'SERVER ERROR' });
}

});

module.exports = router;