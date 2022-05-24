const UserService = require('../services/UserService');
const generateJWT = require('../utils/generateJWT');
const { STATUS_CREATED, STATUS_OK } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await UserService.create(displayName, email, password, image);

    const data = user.dataValues;
    const token = generateJWT(data);

    return res.status(STATUS_CREATED).json({ token });
  } catch (error) {
    console.error('create', error.message);
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const users = await UserService.getAll();

    return res.status(STATUS_OK).json(users);
  } catch (error) {
    console.error('getAll', error.message);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getById(id);

    return res.status(STATUS_OK).json(user);
  } catch (error) {
    console.error('getById', error.message);
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};