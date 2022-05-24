const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, User, Category, PostCategory } = require('../models');
const errorHandler = require('../utils/errorHandler');
const { STATUS_NOT_FOUND, STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED } = require('../utils/statusCodes');

const sequelize = new Sequelize(config.development);

const getByTitle = async (title) => {
  const post = await BlogPost.findOne({
    where: { title },
  });

  return post;
};

const create = async (title, content, categoryIds, userId) => {
  const checkCategories = await Category.findAll({
    where: { id: categoryIds },
  });

  if (!checkCategories.length) {
    throw errorHandler(STATUS_BAD_REQUEST, '"categoryIds" not found');
  }

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

const checkUser = async (id, userId) => {
  const post = await BlogPost.findOne({
    where: { id },
  });

  if (!post || post.userId !== userId) {
    throw errorHandler(STATUS_UNAUTHORIZED, 'Unauthorized user');
  }
};

const update = async (title, content, id, userId) => {
  await checkUser(id, userId);

  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  const postUpdated = await getById(id);

  return postUpdated;
};

const remove = async (id, userId) => {
  const checkPost = await BlogPost.findByPk(id);

  if (!checkPost) {
    throw errorHandler(STATUS_NOT_FOUND, 'Post does not exist');
  }

  await checkUser(id, userId);

  const result = await sequelize.transaction(async (t) => {
    await PostCategory.destroy({
      where: { postId: id },
    }, { transaction: t });

    await BlogPost.destroy({
      where: { id },
    }, { transaction: t });
  });

  return result;
};

module.exports = {
  getByTitle,
  create,
  getAll,
  getById,
  update,
  remove,
};