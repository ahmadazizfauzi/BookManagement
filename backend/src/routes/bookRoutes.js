// src/routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Endpoint untuk mengambil semua data dari tabel books
router.get('/books', bookController.getBooks);

// Endpoint untuk mengambil buku berdasarkan ID
router.get('/books/:id', bookController.getBookById); // Tambahkan ini

// Endpoint untuk menambahkan buku baru
router.post('/books', bookController.addBook);

// Endpoint untuk menghapus buku berdasarkan ID
router.delete('/books/:id', bookController.deleteBook);

// Endpoint untuk memperbarui buku berdasarkan ID
router.put('/books/:id', bookController.updateBook);

module.exports = router;
