const CategoryService = require('../services/CategoryService');
const { STATUS_CREATED } = require('../utils/statusCodes');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await CategoryService.create(name);

    return res.status(STATUS_CREATED).json(category);
  } catch (error) {
    console.error('create', error.message);
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  create,
};