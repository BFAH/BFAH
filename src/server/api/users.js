const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const { verify } = require("../util");

//GET returns all users
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
  }
});

//GET returns user by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    res.status(200).send(user);
  } catch (err) {
    console.error();
  }
});

//GET returns logged in user's ID
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

//POST creates users account profile information
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

//PATCH users can edit their account profile information
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
  console.log(req.body)

  try {
    const account = await prisma.account.update({
      where: {
        id: accountId
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
    console.log(account)
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message)
  }
});

//PATCH updates user isAdmin to true
router.patch("/admin", async (req, res, next) => {
  const { id } = req.body;
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

//PATCH updates user isAdmin to false
router.patch("/admin/remove", async (req, res, next) => {
  const { id } = req.body;
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

// Endpoint to handle shipping info submission
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

    res
      .status(200)
      .json({ message: "Shipping information submitted successfully." });
  } catch (error) {
    console.error("Error submitting shipping information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
