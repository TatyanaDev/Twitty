export {};
const { Router } = require("express");
const TokenController = require("../controller/token");

const tokenRouter: any = Router();

tokenRouter.get("/refresh", TokenController.refresh);

tokenRouter.post("/logout", TokenController.logout);

module.exports = tokenRouter;
