'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPost = queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      published: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });

    return BlogPost;
  },

  down: async (queryInterface) => {
    const BlogPost = queryInterface.dropTable('BlogPosts');

    return BlogPost;
  }
};
