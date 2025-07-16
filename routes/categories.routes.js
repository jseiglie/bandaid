const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const { tokenMiddleware } = require('../middleware/auth.middleware');


router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);
router.post('/', tokenMiddleware, categoriesController.createCategory);
router.put('/:id', tokenMiddleware, categoriesController.updateCategory);
router.delete('/:id', tokenMiddleware, categoriesController.deleteCategory);



module.exports = {
    router,
    path: "/categories"
}