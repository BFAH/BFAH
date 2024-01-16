const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const {verify} = require('../util')

//GET returns logged in user's ID
router.get('/current/account', verify, async (req, res, next) => {
	try {
		const currentUser = await prisma.user.findFirst({
			where: {
				id: req.user.id,
			}
		});
		res.status(200).send(currentUser);
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;