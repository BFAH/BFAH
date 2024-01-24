const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE);

const router = require("express").Router();

//POST /auth/register creates a user with a hased password
router.post("/register", async (req, res, next) => {
  const { email, username, password } = req.body;
  const SALT_ROUNDS = 5;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const account = await stripe.accounts.create({
      type: 'standard',
      country: 'US',
      email: email,
    });

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        stripeAccount: account.id,
        isAdmin: false,
        username,
      },
    });
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    console.log(user);
    res.status(201).send({ token });
  } catch (err) {
    console.error("ERROR - Could Not REGISTER!!!", err);
    res.status(500).json({ err: "SERVER ERROR" });
  }
});

//POST /auth/login checks for username and password and logs in if valid
router.post('/login', async (req, res, next) => {
  const {username, password} = req.body;
  if (!username || !password) {
    res.send('Both a username and password are required')
    return
  }

  try {
const user = await prisma.user.findUnique({
  where: {
    username
  }
})
console.log(user)
if (!user) {
  res.status(401).send('Username or password is incorrect')
  return
}

const isValid = await bcrypt.compare(password, user.password)
if (!isValid) {
  res.status(401).send('User is not VALID!!!')
  return
}
const token = jwt.sign({id: user.id, email: user.email, isAdmin: user.isAdmin},
  process.env.JWT_SECRET)
  res.status(200).send({token})
  } 
  
  catch (err) {
    console.error("ERROR - Could Not LOGIN!!!", err);
    res.status(500).json({ err: "SERVER ERROR" });
  }
})


module.exports = router;
