export {};
const { body } = require("express-validator");
const { Router } = require("express");
const PostAndCommentsController = require("../controller/postAndComments");
const UserAndPostsController = require("../controller/userAndPosts");
const authMiddleware = require("../middlewares/auth");
const UserController = require("../controller/user");

const userRouter: any = Router();

userRouter.post("/register", 
           body("firstName").isString().notEmpty(), 
           body("lastName").isString().notEmpty(), 
           body("userName").isString().notEmpty(), 
           body("email").isString().notEmpty().isEmail(), 
           body("password").isString().isLength({ min: 6 }), 
           UserController.createUser);

userRouter.post("/login", 
           body("email").isString().notEmpty().isEmail(), 
           body("password").isString().isLength({ min: 6 }), 
           UserController.checkUser);

userRouter.get("/data",
           authMiddleware, 
           UserController.getUserInfo);

userRouter.route("/:userId/post")
          .get(authMiddleware,
           UserAndPostsController.getUserPosts)
          .post(authMiddleware,
           body("content").isString().notEmpty(), 
           UserAndPostsController.createPostForUser)

userRouter.route("/:userId/post/:postId")
          .patch(authMiddleware,
           UserAndPostsController.updateUserPost)
          .delete(authMiddleware,
           UserAndPostsController.deleteUserPost);

userRouter.route("/:userId/post/:postId/comment")
          .post(authMiddleware,
           body("contents").isString().notEmpty(), 
           PostAndCommentsController.createCommentForPost)

userRouter.route("/:userId/post/:postId/comment/:commentId")
          .patch(authMiddleware,
           PostAndCommentsController.updatePostComment)
          .delete(authMiddleware,
           PostAndCommentsController.deletePostComment);

module.exports = userRouter;