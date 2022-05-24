const { BlogPost, User, Category } = require('../models');
const errorHandler = require('../utils/errorHandler');
const { STATUS_NOT_FOUND, STATUS_BAD_REQUEST } = require('../utils/statusCodes');

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

// const update = async (title, content, id) => {
//   const checkPost = await getById(id);

//   if (!checkPost) {

//   }
// };

module.exports = {
  getByTitle,
  create,
  getAll,
  getById,
  // update,
};