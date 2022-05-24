const { BlogPost, User, Category } = require('../models');
const errorHandler = require('../utils/errorHandler');
const { STATUS_NOT_FOUND } = require('../utils/statusCodes');

const create = async (title, content, categoryIds, userId) => {
  const post = await BlogPost.create({ title, content, userId });
  await post.addCategory(categoryIds);

  return post;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    throw errorHandler(STATUS_NOT_FOUND, 'Post does not exist');
  }
  return post;
};

module.exports = {
  create,
  getAll,
  getById,
};