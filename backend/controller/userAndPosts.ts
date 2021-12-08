export {};
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");
const { Post } = require("../models");
interface PostForUser {
  id: number;
  userId: number;
  content: string;
  updatedAt?: Date;
  createdAt?: Date;
}

module.exports.createPostForUser = async (req: any, res: any, next: any) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const {
      params: { userId },
      body,
    } = req;

    body.userId = userId;

    const createdPost: PostForUser = await Post.create(body);

    const { id: postId } = createdPost;

    if (!postId) {
      return res.status(400).send({ error: "Error when creating a post" });
    }

    res.status(201).send({ data: createdPost });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserPosts = async (req: any, res: any, next: any) => {
  try {
    const {
      params: { userId },
    } = req;

    const posts: PostForUser[] = await Post.findAll({ where: { userId } });

    if (!posts.length) {
      return res.status(404).send({ error: "Posts not found" });
    }

    res.status(200).send({ data: posts.slice().sort((a: PostForUser, b: PostForUser) => b.id - a.id) });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserPost = async (req: any, res: any, next: any) => {
  try {
    const {
      params: { postId: id, userId },
      body,
    } = req;

    const findPost: PostForUser = await Post.findOne({ where: { id } });

    if (!findPost) {
      return res.status(404).send({ error: "Post not found" });
    }

    if (findPost.userId === Number(userId)) {
      const [rowsCount, [updatePost]] = await Post.update(body, { where: { id }, returning: true });

      if (rowsCount !== 1) {
        return res.status(400).send({ error: "User post has not been updated" });
      }

      return res.status(200).send({ data: updatePost });
    }

    res.status(409).send({ error: "No such post was found for the user" });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserPost = async (req: any, res: any, next: any) => {
  try {
    const {
      params: { postId: id, userId },
    } = req;

    const findPost: PostForUser = await Post.findOne({ where: { id } });

    if (!findPost) {
      return res.status(404).send({ error: "Posts not found" });
    }

    if (findPost.userId === Number(userId)) {
      const rowsCount: number = await Post.destroy({ where: { id } });

      if (!rowsCount) {
        return res.status(404).send({ error: "Post has already been deleted" });
      }

      return res.status(200).send({ data: `${rowsCount} post successfully deleted` });
    }

    res.status(404).send({ error: "User is not found" });
  } catch (err) {
    next(err);
  }
};
