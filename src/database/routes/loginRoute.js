const loginRouter = require('express').Router();

const LoginController = require('../controllers/LoginController');

loginRouter.post('/login', LoginController.login);

module.exports = loginRouter;