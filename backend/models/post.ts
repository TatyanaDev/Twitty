import { Model, DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
      Post.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comments",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
    }
  }

  Post.init(
    {
      userId: {
        field: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      underscored: true,
      timestamps: true,
    }
  );

  return Post;
};
