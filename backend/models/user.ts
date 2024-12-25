import { Model, DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: "userId",
        as: "posts",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        as: "comments",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
    }
  }

  User.init(
    {
      firstName: {
        field: "first_name",
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      lastName: {
        field: "last_name",
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      userName: {
        field: "user_name",
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      timestamps: true,
    }
  );

  return User;
};
