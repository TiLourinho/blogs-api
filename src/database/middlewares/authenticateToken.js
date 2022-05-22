require('dotenv').config();
const jwt = require('jsonwebtoken');
const { STATUS_UNAUTHORIZED, STATUS_INTERNAL_SERVER_ERROR } = require('../utils/statusCodes');

const secret = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'Token not found' });
    }

    const decoded = jwt.verify(authorization, secret);

    req.user = decoded;

    next();
  } catch (error) {
    console.error('authenticateToken', error.message);
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = authenticateToken;