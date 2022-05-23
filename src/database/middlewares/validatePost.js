const { postSchema } = require('../schemas/post');
const { STATUS_BAD_REQUEST } = require('../utils/statusCodes');

const validateUser = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = postSchema.validate({ title, content, categoryIds });
  
  if (error) {
    if (error.details[0].type === 'string.empty') {
      next({ status: STATUS_BAD_REQUEST, message: 'Some required fields are missing' });
    }
    if (error.details[0].type === 'array.length') {
      next({ status: STATUS_BAD_REQUEST, message: '"categoryIds" not found' });
    }
    next({ status: STATUS_BAD_REQUEST, message: error.message });
  }
  next();  
};

module.exports = validateUser;