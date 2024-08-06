const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Endpoint untuk mengambil semua kategori
router.get('/categories', categoryController.getCategories);

// Endpoint untuk mengambil kategori berdasarkan ID
router.get('/categories/:id', categoryController.getCategoryById);

// Endpoint untuk menambahkan kategori baru
router.post('/categories', categoryController.addCategory);

// Endpoint untuk menghapus kategori berdasarkan ID
router.delete('/categories/:id', categoryController.deleteCategory);

// Endpoint untuk memperbarui kategori berdasarkan ID
router.put('/categories/:id', categoryController.updateCategory);

module.exports = router;
