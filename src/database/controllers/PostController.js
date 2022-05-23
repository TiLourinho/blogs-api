const PostService = require('../services/PostService');
const { STATUS_CREATED, STATUS_OK } = require('../utils/statusCodes');

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

const getAll = async (req, res) => {
  try {
    const posts = await PostService.getAll();

    return res.status(STATUS_OK).json(posts);
  } catch (error) {
    console.error('getAll', error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
};