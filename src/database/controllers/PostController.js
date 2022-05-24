const PostService = require('../services/PostService');
const { STATUS_CREATED, STATUS_OK, STATUS_NO_CONTENT } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title, content, categoryIds } = req.body;
    await PostService.create(title, content, categoryIds, id);

    const post = await PostService.getByTitle(title);

    return res.status(STATUS_CREATED).json(post);
  } catch (error) {
    console.error('create', error.message);
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const posts = await PostService.getAll();

    return res.status(STATUS_OK).json(posts);
  } catch (error) {
    console.error('getAll', error.message);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PostService.getById(id);

    return res.status(STATUS_OK).json(post);
  } catch (error) {
    console.error('getById', error.message);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content } = req.body;
    const post = await PostService.update(title, content, id, userId);

    return res.status(STATUS_OK).json(post);
  } catch (error) {
    console.error('update', error.message);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await PostService.remove(id, userId);

    return res.status(STATUS_NO_CONTENT).end();
  } catch (error) {
    console.error('remove', error.message);
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    const post = await PostService.search(q);

    return res.status(STATUS_OK).json(post);
  } catch (error) {
    console.error('search', error.message);
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
};