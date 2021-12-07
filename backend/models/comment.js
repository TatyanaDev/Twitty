'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
    }
  };
  Comment.init(
    {
      contents: {
        allowNull: false,
        type: DataTypes.STRING(500),
        validate: {
          notNull: true,
          notEmpty: true,
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    }, {
    sequelize,
    modelName: 'Comment',
    tableName: "comments",
    underscored: true,
  });
  return Comment;
};