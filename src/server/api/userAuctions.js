const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const {verify} = require('../util')

//GET gets all auctions
router.get('/', async (req, res, next) => {
	try {
		const allUserAuctions = await prisma.userAuctions.findMany();
		res.status(200).send(allUserAuctions)
	} catch (err) {
		console.error(err);
	}
})

//POST creates a user bid
router.post('/', verify, async (req, res, next) => {
	const {auctionId, productId, isActive, isHighest, bidStartTime, bidEndTime,
	currentBidPrice} = req.body;
	try {
		const userAuction = await prisma.userAuctions.create({
			data: {
				userId: req.user.id,
				auctionId,
				productId,
				isActive,
				isHighest,
				bidStartTime,
				bidEndTime,
				currentBidPrice
			}
		})
		res.status(201).send(userAuction)
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;
