const { Router: RouterForUsers } = require("express");
const UserAndPostsController = require("../controller/userAndPosts");
const UserController = require("../controller/user.ts");

const userRouter: any = RouterForUsers();

userRouter.route("/register").post(UserController.createUser);
userRouter.route("/login").post(UserController.checkUser);

userRouter.route("/:userId/post").post(UserAndPostsController.createPostForUser).get(UserAndPostsController.getUserPosts);
userRouter.route("/:userId/post/:postId").patch(UserAndPostsController.updateUserPost).delete(UserAndPostsController.deleteUserPost);

module.exports = userRouter;
