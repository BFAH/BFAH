const {PrismaClient} = require('@prisma/client')
const prisma = new (PrismaClient)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = require("express").Router();

//PORS /auth/register creates a user with a hased password
router.post('/register', ) 

module.exports = router;