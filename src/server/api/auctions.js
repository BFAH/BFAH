const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const { verify } = require("../util");

router.get("/", async (req, res, next) => {
  try {
    const auction = await prisma.auctions.findMany({
      include: {
        products: true,
      },
    });
    res.status(200).send(auction);
  } catch (err) {
    console.error(err);
  }
});

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

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
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
  } catch (err) {
    console.error();
  }
});

router.get("/order/history", verify, async (req, res, next) => {
  try {
    const currentUser = await prisma.auctions.findMany({
      where: {
        isActive: false
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

router.get("/current/bids", verify, async (req, res, next) => {
  try {
    const currentUser = await prisma.auctions.findMany({
      where: {
        currentBidUserId: req.user.id,
        isActive: true
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

router.post("/", verify, async (req, res, next) => {
  const { bidStartTime, bidEndTime, currentBidPrice, productId, isActive } =
    req.body;
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
  } catch (err) {
    console.error(err);
  }
});

router.patch("/winner/complete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const auction = await prisma.auctions.update({
      where: {
        id: +id,
      },
      data: {
        isActive: false
      },
    });
    res.status(201).send(auction);
  } catch (err) {
    console.error(err);
  }
});

router.patch("/:id", verify, async (req, res, next) => {
  const { id } = req.params;
  const { currentBidPrice, stripePriceId} = req.body;
  try {
    const auction = await prisma.auctions.update({
      where: {
        id: +id,
      },
      data: {
        currentBidPrice,
        currentBidUserId: req.user.id,
        products: {
          update: {stripePriceId: stripePriceId}
        },
      },
    });
    res.status(201).send(auction);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", verify, async (req, res, next) => {
  const { id } = req.params;
  try {
    const auction = await prisma.auctions.delete({
      where: {
        id: +id,
        userId: req.user.id,
      },
    });
    res.status(201).send(auction);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;