const { Router: RouterForPosts } = require("express");
const PostController = require("../controller/post.ts");

const postRouter: any = RouterForPosts();

postRouter.route("/").post(PostController.createPost).get(PostController.getPosts);
postRouter.route("/:postId").patch(PostController.updatePost).delete(PostController.deletePost);

module.exports = postRouter;
