const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) =>
    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        field: "user_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      postId: {
        field: "post_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      contents: {
        allowNull: false,
        type: DataTypes.STRING(500),
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: DataTypes.DATE,
      },
    }),

  down: async (queryInterface) => await queryInterface.dropTable("comments"),
};
