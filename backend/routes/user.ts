const { Router: RouterForUsers } = require("express");
const UserController = require("../controller/user.ts");

const userRouter: any = RouterForUsers();

userRouter.route("/register").post(UserController.createUser);
userRouter.route("/login").post(UserController.checkUser);

module.exports = userRouter;
