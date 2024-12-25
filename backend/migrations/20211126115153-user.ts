const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) =>
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        field: "first_name",
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        field: "last_name",
        allowNull: false,
        type: DataTypes.STRING,
      },
      userName: {
        field: "user_name",
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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

  down: async (queryInterface) => await queryInterface.dropTable("users"),
};
