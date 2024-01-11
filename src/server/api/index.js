const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/auctions", require("./auctions"));

module.exports = router;