import { Model, DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
      Comment.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
    }
  }

  Comment.init(
    {
      userId: {
        field: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        field: "post_id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
      underscored: true,
      timestamps: true,
    }
  );

  return Comment;
};
