const { Router } = require("express");
const postRoutes = require("./post");
const userRoutes = require("./user");

const router: any = Router();

router.use("/post", postRoutes);
router.use("/user", userRoutes);

module.exports = router;
