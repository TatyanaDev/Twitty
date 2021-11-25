const { Router } = require("express");
const PostController = require("../controller/post.ts");

const postRouter: any = Router();

postRouter.route("/").post(PostController.createPost).get(PostController.getPosts);
postRouter.route("/:id").patch(PostController.updatePost).delete(PostController.deletePost);

module.exports = postRouter;
