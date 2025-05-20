const { validationResult } = require("express-validator");
const { User, Post, Comment } = require("../models");
const ApiError = require("../exceptions/apiError");

module.exports.getPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      include: {
        model: User,
        as: "user",
        attributes: ["firstName", "lastName", "userName"],
      },
    });

    if (!comments.length) {
      throw ApiError.notFoundError("Comments");
    }

    res.status(200).send({ data: comments });
  } catch (err) {
    next(err);
  }
};

module.exports.createCommentForPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Validation error", errors.array()));
    }

    const { userId, postId } = req.params;
    const { content } = req.body;

    const createdComment = await Comment.create({ userId, postId, content });

    if (!createdComment) {
      throw ApiError.createResourceError("comment");
    }

    res.status(201).send({ data: createdComment });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePostComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { postId, commentId } = req.params;

    const foundPost = await Post.findOne({ where: { id: postId } });

    if (!foundPost) {
      throw ApiError.notFoundError("Post");
    }

    const foundComment = await Comment.findOne({
      where: { id: commentId, postId },
    });

    if (!foundComment) {
      throw ApiError.notFoundError("Comment for this post");
    }

    const [, [updatedComment]] = await Comment.update(req.body, {
      where: { id: commentId },
      returning: true,
    });

    if (!updatedComment) {
      throw ApiError.updateResourceError("comment");
    }

    res.status(200).send({ data: updatedComment });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePostComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const foundComment = await Comment.findOne({
      where: { id: commentId, postId },
    });

    if (!foundComment) {
      throw ApiError.notFoundError("Comment for this post");
    }

    const rowsCount = await Comment.destroy({ where: { id: commentId } });

    if (rowsCount !== 1) {
      throw ApiError.notFoundError("Comment");
    }

    res.status(200).send({ data: { commentId } });
  } catch (err) {
    next(err);
  }
};
