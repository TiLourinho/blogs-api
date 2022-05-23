const postRouter = require('express').Router();
const validatePost = require('../middlewares/validatePost');
const authenticateToken = require('../middlewares/authenticateToken');

const PostController = require('../controllers/PostController');

postRouter.post('/post', authenticateToken, validatePost, PostController.create);

module.exports = postRouter;