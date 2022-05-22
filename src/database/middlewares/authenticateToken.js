const jwt = require('jsonwebtoken');
const { STATUS_UNAUTHORIZED } = require('../utils/statusCodes');

const secret = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'Token not found' });
    }

    const decoded = jwt.verify(authorization, secret);

    req.user = decoded;

    next();
  } catch (error) {
    console.error('authenticateToken', error.message);
    return res.status(STATUS_UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authenticateToken;