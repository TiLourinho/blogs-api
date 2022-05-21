const LoginService = require('../services/LoginService');
const generateJWT = require('../../utils/generateJWT');
const { STATUS_OK } = require('../../utils/statusCodes');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await LoginService.login(email, password);

    const data = user.dataValues;
  
    const { password: passDB, ...userWithoutPass } = data;
    const token = generateJWT(userWithoutPass);
  
    return res.status(STATUS_OK).json({ token });
  } catch (error) {
    console.error('login', error.message);
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  login,
};