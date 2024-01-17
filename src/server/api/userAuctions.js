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

//PATCH updates a users bid for isHighest true
router.patch('/update', verify, async (req, res, next) => {
	const { auctionId, isHighest } = req.body;
	try {
		const auction = await prisma.userAuctions.update({
			where: {
				userId: req.user.id,
				auctionId
			},
			data: {
				isHighest,
			}
		})
		res.status(201).send(auction)
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;
