const { Router } = require("express");
const PostController = require("../controller/post");

const postRouter = Router();

postRouter.get("/", PostController.getPosts);

module.exports = postRouter;
