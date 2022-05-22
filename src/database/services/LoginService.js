const { User } = require('../models');
const errorHandler = require('../utils/errorHandler');
const { STATUS_BAD_REQUEST } = require('../utils/statusCodes');

const login = async (email, password) => {
  if (email.length === 0 || password.length === 0) {
    throw errorHandler(STATUS_BAD_REQUEST, 'Some required fields are missing');
  }

  const user = await User.findOne({
    where: { email },
  });
    
  if (!user || user.password !== password) {
    throw errorHandler(STATUS_BAD_REQUEST, 'Invalid fields');
  }
  return user;
};

module.exports = {
  login,
};