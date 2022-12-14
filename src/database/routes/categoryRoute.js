const categoryRouter = require('express').Router();
const validateCategory = require('../middlewares/validateCategory');
const authenticateToken = require('../middlewares/authenticateToken');

const CategoryController = require('../controllers/CategoryController');

categoryRouter.get('/categories', authenticateToken, CategoryController.getAll);
categoryRouter.post('/categories', authenticateToken, validateCategory, CategoryController.create);

module.exports = categoryRouter;