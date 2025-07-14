
const CategoriesModel = require("../models/categories");

module.exports = class Categories {
  static async getAllCategories() {
    try {
      const categories = await CategoriesModel.findAll();
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  static async getCategoryById(id) {
    try {
      const category = await CategoriesModel.findByPk(id);
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      throw error;
    }
  }
  static async createCategory(categoryData) {
    try {
      const newCategory = await CategoriesModel.create(categoryData);
      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }
  static async updateCategory(id, categoryData) {
    try {
      const category = await CategoriesModel.findByPk(id);
      if (!category) {
        throw new Error("Category not found");
      }
      await category.update(categoryData);
      return category;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

    static async deleteCategory(id) {
        try {
        const category = await CategoriesModel.findByPk(id);
        if (!category) {
            throw new Error("Category not found");
        }
        await category.destroy();
        return { message: "Category deleted successfully" };
        } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
        }
    }
    static async getCategoriesWithMerchandise() {
        try {
            const categories = await CategoriesModel.findAll({
                include: [{
                    model: Merchandise,
                    as: 'merchandise',
                    required: false // Include categories even if they have no merchandise
                }]
            });
            if (!categories) {
                throw new Error("No categories found");
            }
            return categories;
        } catch (error) {
            console.error("Error fetching categories with merchandise:", error);
            throw error;
        }
    }
}