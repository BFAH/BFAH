const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const {verify} = require('../util')

router.get('/', async (req, res, next) => {
	try {
		const allUserAuctions = await prisma.userAuctions.findMany();
		res.status(200).send(allUserAuctions)
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;
