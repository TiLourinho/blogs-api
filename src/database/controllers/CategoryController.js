const CategoryService = require('../services/CategoryService');
const { STATUS_CREATED, STATUS_OK } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await CategoryService.create(name);

    return res.status(STATUS_CREATED).json(category);
  } catch (error) {
    console.error('create', error.message);
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const categories = await CategoryService.getAll();

    return res.status(STATUS_OK).json(categories);
  } catch (error) {
    console.error('getAll', error.message);
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};