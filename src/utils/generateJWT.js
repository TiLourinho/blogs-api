require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const config = {
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const token = jwt.sign({ data: payload }, secret, config);

  return token;
};

module.exports = generateJWT;