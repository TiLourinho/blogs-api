'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const User = queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });

    return User;
  },

  down: async (queryInterface) => {
    const User = queryInterface.dropTable('Users');

    return User;
  }
};