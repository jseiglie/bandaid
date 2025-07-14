const CategoriesClass = require('../class/categories.class');
const responseObject = require('../utils/response.js');
const categoriesController = {};
const UsersClass = require('../class/users.class');
categoriesController.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoriesClass.getAllCategories();
    res.status(200).responseObject(200, true, "Categories fetched successfully", categories);
  } catch (error) {
    res.status(500).responseObject(500, false, "Internal server error", null);
  }
}
categoriesController.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoriesClass.getCategoryById(id);
    res.status(200).responseObject(200, true, "Category fetched successfully", category);
  } catch (error) {
    res.status(404).responseObject(404, false, error.message, null);
  }
}
categoriesController.createCategory = async (req, res) => {
  const categoryData = req.body;
  try {
    const user_id = req.user.id;
    isAdmin = await UsersClass.getUserById(user_id);
    if (!user.isAdmin) {
      return res.status(403).responseObject(403, false, "Forbidden: Only admins can create categories", null);
    }
    const newCategory = await CategoriesClass.createCategory(categoryData);
    res.status(201).responseObject(201, true, "Category created successfully", newCategory);
  } catch (error) {
    res.status(500).responseObject(500, false, "Internal server error", null);
  }
}
categoriesController.updateCategory = async (req, res) => {
  const { id } = req.params;
  const categoryData = req.body;
  const user_id = req.user.id;
  
  try {
    isAdmin = await UsersClass.getUserById(user_id);
    if (!user.isAdmin) {
      return res.status(403).responseObject(403, false, "Forbidden: Only admins can update categories", null);
    }
    const updatedCategory = await CategoriesClass.updateCategory(id, categoryData);
    res.status(200).responseObject(200, true, "Category updated successfully", updatedCategory);
  } catch (error) {
    res.status(404).responseObject(404, false, error.message, null);
  }
}

categoriesController.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    isAdmin = await UsersClass.getUserById(user_id);
    if (!user.isAdmin) {
      return res.status(403).responseObject(403, false, "Forbidden: Only admins can delete categories", null);
    }
    const response = await CategoriesClass.deleteCategory(id);
    res.status(200).responseObject(200, true, response.message, null);
  } catch (error) {
    res.status(404).responseObject(404, false, error.message, null);
  }
}

module.exports = categoriesController;