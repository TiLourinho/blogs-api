const { loginSchema } = require('../schemas/login');
const { STATUS_BAD_REQUEST } = require('../utils/statusCodes');

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error.details[0].type === 'any.required') {
    next({ status: STATUS_BAD_REQUEST, message: error.message });
  }
  next();
};

module.exports = validateLogin;