const { Router: RouterForUsers } = require("express");
const UserController = require("../controller/user.ts");

const userRouter: any = RouterForUsers();

userRouter.route("/").post(UserController.createUser);

module.exports = userRouter;
