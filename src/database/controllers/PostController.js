const PostService = require('../services/PostService');
const { STATUS_CREATED, STATUS_OK } = require('../utils/statusCodes');

const create = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, content, categoryIds } = req.body;
    await PostService.create(title, content, categoryIds, id);

    const post = await PostService.getByTitle(title);

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
    return res.status(error.status).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostService.getById(id);

    return res.status(STATUS_OK).json(post);
  } catch (error) {
    console.error('getAll', error.message);
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};