const { postSchema } = require('../schemas/post');
const { STATUS_BAD_REQUEST } = require('../utils/statusCodes');

const validateUser = (req, _res, next) => {
  const { title, content } = req.body;

  const { error } = postSchema.validate({ title, content });
  
  if (error) {
    if (error.details[0].type === 'string.empty') {
      next({ status: STATUS_BAD_REQUEST, message: 'Some required fields are missing' });
    }
    next({ status: STATUS_BAD_REQUEST, message: error.message });
  }
  next();  
};

module.exports = validateUser;