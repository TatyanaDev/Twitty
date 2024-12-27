const { Router } = require("express");
const { validateEmail } = require("../middlewares/validators");
const TokenController = require("../controller/token");
const authMw = require("../middlewares/auth");

const tokenRouter = Router();

tokenRouter.get("/refresh", TokenController.refreshToken);

tokenRouter.post("/logout", authMw, validateEmail, TokenController.logoutToken);

module.exports = tokenRouter;
