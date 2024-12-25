import { Model, DataTypes, Sequelize } from "sequelize";

export interface PostAttributes {
  id?: number;
  userId: number;
  content: string;
}

export class Post extends Model<PostAttributes> implements PostAttributes {
  public id!: number;
  public userId!: number;
  public content!: string;

  static associate(models: any): void {
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  }
}

export default (sequelize: Sequelize): typeof Post => {
  Post.init(
    {
      userId: {
        field: "user_id",
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING(1000),
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
