const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/auctions", require("./auctions"));
router.use("/categories", require("./categories"));


module.exports = router;