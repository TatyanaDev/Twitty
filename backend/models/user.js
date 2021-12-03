'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: "userId",
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
    }
  };
  User.init({
    firstName: {
      field: "first_name",
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      field: "last_name",
      allowNull: false,
      type: DataTypes.STRING
    },
    userName: {
      field: "user_name",
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: "User",
    tableName: "users",
    underscored: true,
  });
  return User;
};