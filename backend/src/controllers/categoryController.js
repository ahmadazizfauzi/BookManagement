const categoryModel = require('../models/categoryModel');

const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'An error occurred while fetching categories' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryModel.getCategoryById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the category' });
  }
};

const addCategory = async (req, res) => {
  try {
    const id = await categoryModel.createCategory(req.body);
    res.status(201).json({ id, name: req.body.name });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'An error occurred while adding the category' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const affectedRows = await categoryModel.deleteCategory(req.params.id);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'An error occurred while deleting the category' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const affectedRows = await categoryModel.updateCategory(req.params.id, req.body);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Category updated successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'An error occurred while updating the category' });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  addCategory,
  deleteCategory,
  updateCategory
};
