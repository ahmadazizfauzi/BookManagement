// const express = require('express');
// const mysql = require('mysql');
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// const port = 3001;

// // Enable CORS
// app.use(cors());

// // Middleware untuk parsing JSON
// app.use(express.json());

// // Konfigurasi koneksi MySQL
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// // Cek koneksi database
// db.connect(err => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the MySQL database');
// });

// // Endpoint untuk cek koneksi
// app.get('/api/test', (req, res) => {
//   res.send('API is working!');
// });

// // Endpoint untuk mengambil semua data dari tabel books
// app.get('/api/books', (req, res) => {
//   const query = 'SELECT * FROM books';
  
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('An error occurred while fetching books.');
//       return;
//     }
//     res.json(results);
//   });
// });

// // Endpoint untuk menambahkan buku baru
// app.post('/api/books', (req, res) => {
//   const { title, author, publisher, pages, publication_date, description } = req.body;

//   if (!title || !author) {
//     return res.status(400).json({ error: 'Title and author are required' });
//   }

//   const query = 'INSERT INTO books (title, author, publisher, pages, publication_date, description) VALUES (?, ?, ?, ?, ?, ?)';
//   const values = [title, author, publisher, pages, publication_date, description];

//   db.query(query, values, (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return res.status(500).json({ error: 'An error occurred while adding the book' });
//     }
//     res.status(201).json({
//       id: results.insertId,
//       title,
//       author,
//       publisher,
//       pages,
//       publication_date,
//       description
//     });
//   });
// });

// // Endpoint untuk menghapus buku berdasarkan ID
// app.delete('/api/books/:id', (req, res) => {
//   const bookId = req.params.id;
//   const query = 'DELETE FROM books WHERE id = ?';

//   db.query(query, [bookId], (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return res.status(500).json({ error: 'An error occurred while deleting the book' });
//     }
//     res.status(200).json({ message: 'Book deleted successfully' });
//   });
// });

// // Mulai server
// app.listen(port, () => {
//   console.log(`Backend server is running on http://localhost:${port}`);
// });
