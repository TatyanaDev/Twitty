import { Model, DataTypes, Sequelize } from "sequelize";

export interface CommentAttributes {
  id?: number;
  userId: number;
  postId: number;
  contents: string;
}

export class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id!: number;
  public userId!: number;
  public postId!: number;
  public contents!: string;

  static associate(models: any): void {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

export default (sequelize: Sequelize): typeof Comment => {
  Comment.init(
    {
      userId: {
        field: "user_id",
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      postId: {
        field: "post_id",
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      contents: {
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
      modelName: "Comment",
      tableName: "comments",
      underscored: true,
    }
  );

  return Comment;
};
