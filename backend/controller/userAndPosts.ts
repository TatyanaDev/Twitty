const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");
const { Post } = require("../models");

module.exports.createPostForUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const { userId } = req.params;
    const { content } = req.body;

    const createdPost = await Post.create({ userId, content });

    if (!createdPost) {
      throw ApiError.createResourceError("post");
    }

    res.status(201).send({ data: createdPost });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const { postId } = req.params;

    const foundPost = await Post.findOne({ where: { id: postId } });

    if (!foundPost) {
      throw ApiError.notFoundError("Post");
    }

    const [, [updatedPost]] = await Post.update(req.body, {
      where: { id: postId },
      returning: true,
    });

    if (!updatedPost) {
      throw ApiError.updateResourceError("post");
    }

    res.status(200).send({ data: updatedPost });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const foundPost = await Post.findOne({ where: { id: postId } });

    if (!foundPost) {
      throw ApiError.notFoundError("Post");
    }

    const rowsCount = await Post.destroy({ where: { id: postId } });

    if (rowsCount !== 1) {
      throw ApiError.notFoundError("Post");
    }

    res.status(200).send({ data: { postId } });
  } catch (err) {
    next(err);
  }
};
