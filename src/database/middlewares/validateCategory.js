const { categorySchema } = require('../schemas/category');
const { STATUS_BAD_REQUEST } = require('../utils/statusCodes');

const validateCategory = (req, _res, next) => {
  const { name } = req.body;

  const { error } = categorySchema.validate({ name });
  
  if (error) {
    next({ status: STATUS_BAD_REQUEST, message: error.message });
  }
  next();  
};

module.exports = validateCategory;