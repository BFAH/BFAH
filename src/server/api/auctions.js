const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const { verify } = require("../util");

//GET gets all auctions
router.get("/", async (req, res, next) => {
  try {
    const auction = await prisma.auctions.findMany();
    res.status(200).send(auction);
  } catch (err) {
    console.error(err);
  }
});

//GET get single auction by ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const auction = await prisma.auctions.findUnique({
      where: {
        id: +id,
      },
    });
    res.status(200).send(auction);
  } catch (err) {
    console.error();
  }
});

//POST creates a new auction
router.post("/", verify, async (req, res, next) => {
  const { bidStartTime, bidEndTime, currentBidPrice, productId } = req.body;
  try {
    const auction = await prisma.auctions.create({
      data: {
        bidStartTime,
        bidEndTime,
        currentBidPrice,
        productId,
        userId: req.user.id
      },
    });
    res.status(201).send(auction);
  } catch (err) {
    console.error(err);
  }
});

//PATCH updates an auction
router.patch("/:id", verify, async (req, res, next) => {
  const { id } = req.params;
  const { currentBidPrice } = req.body;
  try {
    const auction = await prisma.auctions.update({
      where: {
        id: +id,
      },
      data: {
        currentBidPrice,
      },
    });
    res.status(201).send(auction);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
