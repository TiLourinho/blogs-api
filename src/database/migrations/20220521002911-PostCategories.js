'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostCategory = queryInterface.createTable('PostCategories', {
      postId: {
        allowNull: false,
        onDelete: 'CASCADE',
        primaryKey: true,
        references: {
          model: 'BlogPosts',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: false,
        onDelete: 'CASCADE',
        primaryKey: true,
        references: {
          model: 'Categories',
          key: 'id'
        },
        type: Sequelize.INTEGER
      }
    });

    return PostCategory;
  },

  down: async (queryInterface) => {
    const PostCategory = queryInterface.dropTable('PostCategories');

    return PostCategory;
  }
};
