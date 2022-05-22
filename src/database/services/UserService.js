const { User } = require('../models');
const errorHandler = require('../utils/errorHandler');
const { STATUS_CONFLICT } = require('../utils/statusCodes');

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

module.exports = {
  create,
};