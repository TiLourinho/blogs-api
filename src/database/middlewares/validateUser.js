const { userSchema } = require('../../schemas/user');
const { STATUS_BAD_REQUEST } = require('../../utils/statusCodes');

const validateUser = (req, _res, next) => {
  const { displayName, email, password } = req.body;

  const { error } = userSchema.validate({ displayName, email, password });
  
  if (error) {
    next({ status: STATUS_BAD_REQUEST, message: error.message });
  }
  next();  
};

module.exports = validateUser;