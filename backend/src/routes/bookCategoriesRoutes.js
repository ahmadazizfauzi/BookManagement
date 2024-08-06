const express = require('express');
const router = express.Router();
const bookCategoriesController = require('../controllers/bookCategoriesController');

// Endpoint untuk mendapatkan semua book_categories
router.get('/book-categories', bookCategoriesController.getBookCategories);

module.exports = router;
