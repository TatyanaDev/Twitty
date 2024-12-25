const { Router } = require("express");
const PostAndCommentsController = require("../controller/postAndComments");
const authMiddleware = require("../middlewares/auth");
const PostController = require("../controller/post");

const postRouter: any = Router();

postRouter.route("/").post(PostController.createPost).get(PostController.getPosts);

postRouter.route("/:postId").get(authMiddleware, PostController.getPost).patch(PostController.updatePost).delete(PostController.deletePost);

postRouter.route("/:postId/comment").get(authMiddleware, PostAndCommentsController.getPostComments);

module.exports = postRouter;
