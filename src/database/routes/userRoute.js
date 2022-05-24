const userRouter = require('express').Router();
const validateUser = require('../middlewares/validateUser');
const authenticateToken = require('../middlewares/authenticateToken');

const UserController = require('../controllers/UserController');

userRouter.post('/user', validateUser, UserController.create);
userRouter.get('/user', authenticateToken, UserController.getAll);
userRouter.get('/user/:id', authenticateToken, UserController.getById);
userRouter.delete('/user/me', authenticateToken, UserController.remove);

module.exports = userRouter;