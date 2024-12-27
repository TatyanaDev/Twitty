const { Router } = require("express");
const userAndPostsAndCommentsRouter = require("./userAndPostsAndComments");
const UserAndPostsController = require("../controller/userAndPosts");
const verifyOwnershipMw = require("../middlewares/verifyOwnership");
const { validateContent } = require("../middlewares/validators");

const userAndPostsRouter = Router({ mergeParams: true });

userAndPostsRouter.get("/", UserAndPostsController.getUserPosts);

userAndPostsRouter.post("/", validateContent, UserAndPostsController.createPostForUser);

userAndPostsRouter.patch("/:postId", verifyOwnershipMw("post"), validateContent, UserAndPostsController.updateUserPost);

userAndPostsRouter.delete("/:postId", verifyOwnershipMw("post"), UserAndPostsController.deleteUserPost);

userAndPostsRouter.use("/:postId/comment", userAndPostsAndCommentsRouter);

module.exports = userAndPostsRouter;
