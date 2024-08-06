const bookCategoriesModel = require('../models/bookCategoriesModel');

const getBookCategories = async (req, res) => {
  try {
    const bookCategories = await bookCategoriesModel.getAllBookCategories();
    res.json(bookCategories);
  } catch (error) {
    console.error('Error fetching book categories:', error);
    res.status(500).send('An error occurred');
  }
};

module.exports = {
  getBookCategories,
};
