const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

//PORS /auth/register creates a user with a hased password
router.post("/register", async (req, res, next) => {
  const { email, username, password } = req.body;
  const SALT_ROUNDS = 5;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isAdmin: false,
        username,
      },
    });
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    res.status(201).send({ token });
  } catch (err) {
    console.error("ERROR - Could Not REGISTER!!!", err);
    res.status(500).json({ err: "SERVER ERROR" });
  }
});

module.exports = router;
