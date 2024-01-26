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

//GET UserName by User's ID
router.get("/store/:id", async (req, res, next) => {
  const  userId  = req.params;
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



//GET returns user by id
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
  console.log(req.body);

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
    console.log(account);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.patch("/account/firstname", verify, async (req, res, next) => {
  const {accountId, firstName} = req.body;
  console.log(req.body);
  try {
    const account = await prisma.account.update({
      where: {id: accountId},
      data: {firstName}
    });
    res.status(201).send(account);
    console.log(account);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.patch("/account/lastname", verify, async (req, res, next) => {
  const {accountId, lastName} = req.body;
  console.log(req.body);
  try {
    const account = await prisma.account.update({
      where: {id: accountId},
      data: {lastName}
    });
    res.status(201).send(account);
    console.log(account);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.patch("/account/streetaddress", verify, async (req, res, next) => {
  const {accountId, streetAddress} = req.body;
  console.log(req.body);
  try {
    const account = await prisma.account.update({
      where: {id: accountId},
      data: {streetAddress}
    });
    res.status(201).send(account);
    console.log(account);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.patch("/account/city", verify, async (req, res, next) => {
  const {accountId, city} = req.body;
  console.log(req.body);
  try {
    const account = await prisma.account.update({
      where: {id: accountId},
      data: {city}
    });
    res.status(201).send(account);
    console.log(account);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.patch("/account/state", verify, async (req, res, next) => {
  const {accountId, state} = req.body;
  console.log(req.body);
  try {
    const account = await prisma.account.update({
      where: {id: accountId},
      data: {state}
    });
    res.status(201).send(account);
    console.log(account);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.patch("/account/zipcode", verify, async (req, res, next) => {
  const {accountId, zipCode} = req.body;
  console.log(req.body);
  try {
    const account = await prisma.account.update({
      where: {id: accountId},
      data: {zipCode}
    });
    res.status(201).send(account);
    console.log(account);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.patch("/account/country", verify, async (req, res, next) => {
  const {accountId, country} = req.body;
  console.log(req.body);
  try {
    const account = await prisma.account.update({
      where: {id: accountId},
      data: {country}
    });
    res.status(201).send(account);
    console.log(account);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.patch("/account/phonenumber", verify, async (req, res, next) => {
  const {accountId, phoneNumber} = req.body;
  console.log(req.body);
  try {
    const account = await prisma.account.update({
      where: {id: accountId},
      data: {phoneNumber}
    });
    res.status(201).send(account);
    console.log(account);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
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

// DELETE deletes a user (only accessible to Admin)
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the logged-in user is an admin
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Permission denied. Admins only." });
    }

    // Proceed with deleting the user
    const deletedUser = await prisma.user.delete({
      where: {
        id: +id,
      },
    });

    res
      .status(200)
      .json({ message: "User deleted successfully.", user: deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

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
