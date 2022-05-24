const postRouter = require('express').Router();
const validatePost = require('../middlewares/validatePost');
const authenticateToken = require('../middlewares/authenticateToken');

const PostController = require('../controllers/PostController');

postRouter.post('/post', authenticateToken, validatePost, PostController.create);
postRouter.get('/post', authenticateToken, PostController.getAll);
postRouter.get('/post/:id', authenticateToken, PostController.getById);

module.exports = postRouter;