export {};
const { Post } = require("../models");
const { User } = require("../models");
interface Post {
  id: number;
  content: string;
  updatedAt?: Date;
  createdAt?: Date;
}

module.exports.createPost = async (req: any, res: any, next: any) => {
  try {
    const { body } = req;
    body.userId = 1;
    const createdPost: Post = await Post.create(body);
    const { id } = createdPost;

    if (!id) {
      return res.status(400).send({ error: "Error when creating a post" });
    }

    res.status(201).send({ data: createdPost });
  } catch (err) {
    next(err);
  }
};

module.exports.getPosts = async (req: any, res: any, next: any) => {
  try {
    const posts: Post[] = await Post.findAll({
      include: {
        model: User,
        attributes: ["firstName", "lastName", "userName"],
      },
    });

    if (!posts.length) {
      return res.status(404).send({ error: "Posts not found" });
    }

    res.status(200).send({ data: posts.slice().sort((a: Post, b: Post) => b.id - a.id) });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePost = async (req: any, res: any, next: any) => {
  try {
    const {
      params: { postId: id },
      body,
    } = req;

    const [rowsCount, [updatePost]] = await Post.update(body, { where: { id }, returning: true });

    if (rowsCount !== 1) {
      return res.status(400).send({ error: "Post cant be updated" });
    }

    res.status(200).send({ data: updatePost });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePost = async (req: any, res: any, next: any) => {
  try {
    const {
      params: { postId: id },
    } = req;

    const rowsCount: number = await Post.destroy({ where: { id } });

    if (!rowsCount) {
      return res.status(404).send({ error: "Post not found" });
    }

    res.status(200).send({ data: `${rowsCount} post successfully deleted` });
  } catch (err) {
    next(err);
  }
};
