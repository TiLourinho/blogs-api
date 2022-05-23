const { BlogPost } = require('../models');

const create = async (title, content, categoryIds, userId) => {
  const post = await BlogPost.create({ title, content, userId });
  await post.addCategory(categoryIds);

  return post;
};

module.exports = {
  create,
};