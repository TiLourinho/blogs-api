const postRouter = require('express').Router();
const validatePost = require('../middlewares/validatePost');
const authenticateToken = require('../middlewares/authenticateToken');

const PostController = require('../controllers/PostController');

postRouter.post('/post', authenticateToken, validatePost, PostController.create);
postRouter.get('/post', authenticateToken, PostController.getAll);
postRouter.get('/post/search', authenticateToken, PostController.search);
postRouter.get('/post/:id', authenticateToken, PostController.getById);
postRouter.put('/post/:id', authenticateToken, validatePost, PostController.update);
postRouter.delete('/post/:id', authenticateToken, PostController.remove);

module.exports = postRouter;