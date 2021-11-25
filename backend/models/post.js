const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model { }
  Post.init(
    {
      content: {
        allowNull: false,
        type: DataTypes.STRING(500),
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      underscored: true,
    }
  );
  return Post;
};
