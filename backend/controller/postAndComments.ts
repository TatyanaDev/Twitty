export {};
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");
const { Comment } = require("../models");
const { Post } = require("../models");
const { User } = require("../models");
interface CommentForPost {
  id: number;
  postId: number;
  userId: number;
  contents: string;
  updatedAt?: Date;
  createdAt?: Date;
}

module.exports.createCommentForPost = async (req: any, res: any, next: any) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const {
      params: { userId, postId },
      body,
    } = req;

    body.userId = userId;
    body.postId = postId;

    const createdComment: CommentForPost = await Comment.create(body);

    const { id: commentId } = createdComment;

    if (!commentId) {
      return res.status(400).send({ error: "Error when creating a comment" });
    }
    res.status(201).send({ data: createdComment });
  } catch (err) {
    next(err);
  }
};

module.exports.getPostComments = async (req: any, res: any, next: any) => {
  try {
    const {
      params: { postId },
    } = req;

    const comments: CommentForPost[] = await Comment.findAll({
      where: { postId },
      include: {
        model: User,
        attributes: ["firstName", "lastName", "userName"],
      },
    });

    if (!comments.length) {
      return res.status(404).send({ error: "No comments yet..." });
    }

    res.status(200).send({ data: comments.slice().sort((a: CommentForPost, b: CommentForPost) => b.id - a.id) });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePostComment = async (req: any, res: any, next: any) => {
  try {
    const {
      params: { postId, userId, commentId: id },
      body,
    } = req;

    const findComment: CommentForPost = await Comment.findOne({ where: { id } });

    if (!findComment) {
      return res.status(404).send({ error: "Comment not found" });
    }

    const findPost = await Post.findOne({ where: { id: postId } });

    if (!findPost) {
      return res.status(404).send({ error: "Post not found" });
    }

    if (findComment.userId === Number(userId)) {
      const [rowsCount, [updateComment]] = await Comment.update(body, { where: { id }, returning: true });

      if (rowsCount !== 1) {
        return res.status(400).send({ error: "User comment has not been updated" });
      }

      return res.status(200).send({ data: updateComment });
    }

    res.status(409).send({ error: "No such comment was found for the post" });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePostComment = async (req: any, res: any, next: any) => {
  try {
    const {
      params: { postId, userId, commentId: id },
    } = req;

    const findComment: CommentForPost = await Comment.findOne({ where: { id } });

    if (!findComment) {
      return res.status(404).send({ error: "Comment not found" });
    }

    const findPost = await Post.findOne({ where: { id: postId } });

    if (!findPost) {
      return res.status(404).send({ error: "Post not found" });
    }

    if (findComment.userId === Number(userId)) {
      const rowsCount: number = await Comment.destroy({ where: { id } });

      if (!rowsCount) {
        return res.status(404).send({ error: "Comment has already been deleted" });
      }

      return res.status(200).send({ data: `${rowsCount} comment successfully deleted` });
    }

    res.status(404).send({ error: "User is not found" });
  } catch (err) {
    next(err);
  }
};
