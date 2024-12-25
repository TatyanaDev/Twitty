const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) =>
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      content: {
        allowNull: false,
        type: DataTypes.STRING(1000),
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

  down: async (queryInterface) => await queryInterface.dropTable("posts"),
};
