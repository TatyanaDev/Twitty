'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        field: "first_name",
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        field: "last_name",
        allowNull: false,
        type: Sequelize.STRING
      },
      userName: {
        field: "user_name",
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};