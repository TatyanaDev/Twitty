const { Router } = require("express");
const TokenController = require("../controller/token");
const authMw = require("../middlewares/auth");

const tokenRouter = Router();

tokenRouter.get("/refresh", TokenController.refreshToken);

tokenRouter.post("/logout", authMw, TokenController.logoutToken);

module.exports = tokenRouter;
