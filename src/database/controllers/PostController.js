const PostService = require('../services/PostService');
const { STATUS_CREATED } = require('../utils/statusCodes');

const create = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, content, categoryIds } = req.body;
    const post = await PostService.create(title, content, categoryIds, id);

    return res.status(STATUS_CREATED).json(post);
  } catch (error) {
    console.error('create', error.message);
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  create,
};