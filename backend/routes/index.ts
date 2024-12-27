const { Router } = require("express");
const tokenRouter = require("./token");
const postRouter = require("./post");
const userRouter = require("./user");

const router = Router();

router.use("/post", postRouter);

router.use("/user", userRouter);

router.use("/token", tokenRouter);

module.exports = router;
