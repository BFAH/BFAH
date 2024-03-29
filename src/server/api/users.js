const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const { verify } = require("../util");

router.get("/", verify, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        Account: true,
        Auctions: {
          include: {
            products: true,
          },
        },
      },
    });
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
  }
});

router.get("/store/:id", async (req, res, next) => {
  const userId = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +userId.id,
      },
    });
    res.status(200).send(user);
  } catch (err) {
    console.error();
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      include: {
        Account: true,
        Auctions: {
          include: {
            products: true,
          },
        },
      },
    });
    res.status(200).send(user);
  } catch (err) {
    console.error();
  }
});

router.get("/current/user", verify, async (req, res, next) => {
  try {
    const currentUser = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
      include: {
        Account: true,
        Auctions: {
          include: {
            products: true,
          },
        },
      },
    });
    res.status(200).send(currentUser);
  } catch (err) {
    console.error(err);
  }
});

router.post("/account/create", verify, async (req, res, next) => {
  const {
    firstName,
    lastName,
    streetAddress,
    city,
    state,
    zipCode,
    country,
    phoneNumber,
  } = req.body;
  try {
    const accountInfo = await prisma.account.create({
      data: {
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        zipCode,
        country,
        phoneNumber,
        userId: req.user.id,
      },
    });
    res.status(201).send(accountInfo);
  } catch (err) {
    console.error(err);
  }
});

router.patch("/account/edit", verify, async (req, res, next) => {
  const {
    firstName,
    lastName,
    streetAddress,
    city,
    state,
    zipCode,
    country,
    phoneNumber,
    accountId,
  } = req.body;
  try {
    const account = await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        zipCode,
        country,
        phoneNumber,
      },
    });
    res.status(201).send(account);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.patch("/admin/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        isAdmin: true,
      },
    });
    res.status(201).send(updateUser);
  } catch (err) {
    console.error(err);
  }
});

router.patch("/admin/remove/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        isAdmin: false,
      },
    });
    res.status(201).send(updateUser);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Permission denied. Admins only." });
    }
    const deletedUser = await prisma.user.delete({
      where: {
        id: +id,
      },
    });

    res.status(200).json({ message: "User deleted successfully.", user: deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/shipping-info", verify, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
    } = req.body;
    await prisma.account.update({
      where: { userId },
      data: {
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        zipCode,
        phoneNumber,
      },
    });
    res.status(200).json({ message: "Shipping information submitted successfully." });
  } catch (error) {
    console.error("Error submitting shipping information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;