const UserService = require('../services/UserService');
const generateJWT = require('../utils/generateJWT');
const { STATUS_CREATED } = require('../utils/statusCodes');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await UserService.create(displayName, email, password, image);

    const data = user.dataValues;
    const token = generateJWT(data);

    return res.status(STATUS_CREATED).json({ token });
  } catch (error) {
    console.error('create', error.message);
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  create,
};