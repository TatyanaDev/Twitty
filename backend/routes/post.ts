export {};
const { Router } = require("express");
const PostController = require("../controller/post");

const postRouter: any = Router();

postRouter.route("/")
          .post(PostController.createPost)
          .get(PostController.getPosts);

postRouter.route("/:postId")
          .patch(PostController.updatePost)
          .delete(PostController.deletePost);

module.exports = postRouter;
