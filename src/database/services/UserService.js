const Sequelize = require('sequelize');
const config = require('../config/config');
const { User, BlogPost } = require('../models');
const errorHandler = require('../utils/errorHandler');
const { STATUS_CONFLICT, STATUS_NOT_FOUND } = require('../utils/statusCodes');

const sequelize = new Sequelize(config.development);

const create = async (displayName, email, password, image) => {
  const checkUser = await User.findOne({
    where: { email },
  });
    
    if (checkUser) {
      throw errorHandler(STATUS_CONFLICT, 'User already registered');
    }

  const user = await User.create({ displayName, email, password, image });

  return user;
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throw errorHandler(STATUS_NOT_FOUND, 'User does not exist');
  }
  return user;
};

const remove = async (id) => {
  const result = await sequelize.transaction(async (t) => {
    await User.destroy({
      where: { id },
    }, { transaction: t });

    await BlogPost.destroy({
      where: { userId: id },
    }, { transaction: t });
  });

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};