export {};
const { body } = require("express-validator");
const { Router } = require("express");
const TokenController = require("../controller/token");
const authMiddleware = require("../middlewares/auth");

const tokenRouter: any = Router();

tokenRouter.get("/refresh", 
            TokenController.refresh);

tokenRouter.post("/logout",
            body("email").isString().notEmpty().isEmail(),
            authMiddleware,  
            TokenController.logout);

module.exports = tokenRouter;
