const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
    }
  }
  Post.init(
    {
      content: {
        allowNull: false,
        type: DataTypes.STRING(1000),
        validate: {
          notNull: true,
          notEmpty: true,
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
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
