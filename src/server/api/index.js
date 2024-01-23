const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/auctions", require("./auctions"));
router.use("/categories", require("./categories"));
router.use("/user-auctions", require("./userAuctions"));
router.use("/stripe", require("./stripe"));
router.use("/order", require("./orderDetails"));



module.exports = router;