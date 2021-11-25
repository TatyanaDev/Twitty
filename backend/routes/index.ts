const { Router: Routes } = require("express");
const postRoutes = require("./post");

const router: any = Routes();

router.use("/post", postRoutes);

module.exports = router;
