export {};
const { body } = require("express-validator");
const { Router } = require("express");
const TokenController = require("../controller/token");

const tokenRouter: any = Router();

tokenRouter.get("/refresh", 
            TokenController.refresh);

tokenRouter.post("/logout",
            body("email").isString().notEmpty().isEmail(), 
            body("password").isString().isLength({ min: 6 }),  
            TokenController.logout);

module.exports = tokenRouter;
