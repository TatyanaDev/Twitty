const { Router } = require("express");
const { validateUserRegistration, validateUserLogin } = require("../middlewares/validators");
const userAndPostsRouter = require("./userAndPosts");
const UserController = require("../controller/user");
const authMw = require("../middlewares/auth");

const userRouter = Router();

userRouter.post("/register", validateUserRegistration, UserController.registerUser);

userRouter.post("/login", validateUserLogin, UserController.loginUser);

userRouter.get("/", authMw, UserController.getUser);

userRouter.use("/:userId/post", authMw, userAndPostsRouter);

module.exports = userRouter;
