const { Router } = require("express");
const userAndPostsAndCommentsController = require("../controller/userAndPostsAndComments");
const verifyOwnershipMw = require("../middlewares/verifyOwnership");
const { validateContent } = require("../middlewares/validators");

const userAndPostsAndCommentsRouter = Router({ mergeParams: true });

userAndPostsAndCommentsRouter.get("/", userAndPostsAndCommentsController.getPostComments);

userAndPostsAndCommentsRouter.post("/", validateContent, userAndPostsAndCommentsController.createCommentForPost);

userAndPostsAndCommentsRouter.patch("/:commentId", verifyOwnershipMw("comment"), validateContent, userAndPostsAndCommentsController.updatePostComment);

userAndPostsAndCommentsRouter.delete("/:commentId", verifyOwnershipMw("comment"), userAndPostsAndCommentsController.deletePostComment);

module.exports = userAndPostsAndCommentsRouter;
