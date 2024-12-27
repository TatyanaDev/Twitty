const ApiError = require("../exceptions/apiError");
const { User, Post } = require("../models");

module.exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["firstName", "lastName", "userName"],
      },
    });

    if (!posts.length) {
      throw ApiError.notFoundError("Posts");
    }

    res.status(200).send({ data: posts });
  } catch (err) {
    next(err);
  }
};
