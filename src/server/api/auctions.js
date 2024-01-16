const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const {verify} = require('../util')

//GET gets all auctions
router.get('/', async (req, res, next) => {
	try {
		const auction = await prisma.auctions.findMany();
		res.status(200).send(auction)
	} catch (err) {
		console.error(err);
	}
})

//POST creates a new auction
router.post('/auction/create', verify, async (req, res, next) => {
    const {bidStartTime, bidEndTime, currentBidPrice, productId} = req.body;
    try {
		const auction = await prisma.auctions.create({
			data: {
				bidStartTime,
                bidEndTime,
                currentBidPrice,
                productId
			}
		})
		res.status(201).send(auction)
	} catch (err) {
		console.error(err);
	}
})


module.exports = router;