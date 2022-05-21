'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Category = queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });

    return Category;
  },

  down: async (queryInterface) => {
    const Category = queryInterface.dropTable('Categories');

    return Category;
  }
};
