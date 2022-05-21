const userRouter = require('express').Router();
const validateUser = require('../middlewares/validateUser');

const UserController = require('../controllers/UserController');

userRouter.post('/user', validateUser, UserController.create);

module.exports = userRouter;