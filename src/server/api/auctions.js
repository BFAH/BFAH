const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const { verify } = require("../util");

//GET gets all auctions
router.get("/", async (req, res, next) => {
  try {
    const auction = await prisma.auctions.findMany({
      include: {
        products: true,
      },
    });
    res.status(200).send(auction);
    console.log(auction)
  } catch (err) {
    console.error(err);
  }
});


//GET gets all auctions related to user
router.get("/user", verify, async (req, res, next) => {
  try {
    const auction = await prisma.auctions.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        products: true,
      },
    });
    res.status(200).send(auction);
  } catch (err) {
    console.error(err);
  }
});

//GET get single auction by ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params)
  try {
    const auction = await prisma.auctions.findFirst({
      where: {
        id: +id,
      },
      include: {
        products: true,
      },
    });
    res.status(200).send(auction);
    console.log(auction)
  } catch (err) {
    console.error();
  }
});

//GET returns logged in user's ID
router.get("/current/bids", verify, async (req, res, next) => {
  try {
    const currentUser = await prisma.auctions.findMany({
      where: {
        currentBidUserId: req.user.id,
      },
      include: {
        products: true,
      },
    });
    res.status(200).send(currentUser);
  } catch (err) {
    console.error(err);
  }
});

//GET gets all auctions related to user
router.get("/seller/store/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const auction = await prisma.auctions.findMany({
      where: {
        userId: +id,
      },
      include: {
        products: true,
      },
    });
    res.status(200).send(auction);
  } catch (err) {
    console.error(err);
  }
});


//POST creates a new auction
router.post("/", verify, async (req, res, next) => {
  const { bidStartTime, bidEndTime, currentBidPrice, productId, isActive } =
    req.body;
  console.log(req.body);
  try {
    const auction = await prisma.auctions.create({
      data: {
        bidStartTime,
        bidEndTime,
        isActive,
        currentBidPrice,
        productId,
        userId: req.user.id,
      },
    });
    res.status(201).send(auction);
    console.log(auction);
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
        currentBidUserId: req.user.id,
      },
    });
    res.status(201).send(auction);
  } catch (err) {
    console.error(err);
  }
});

//DELETE user deletes an auction
router.delete("/:id", verify, async (req, res, next) => {
  const { id } = req.params;

  try {
    const auction = await prisma.auctions.delete({
      where: {
        id: +id,
        userId: req.user.id, // Ensure that the auction belongs to the authenticated user
      },
    });

    res.status(204).send(); // 204 No Content - indicates successful deletion
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
