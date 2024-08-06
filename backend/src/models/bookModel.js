const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// get all
const getAllBooks = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM books', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// get by id
const getBookById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

// create bok
const createBook = (book) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO books SET ?', book, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// delte bok
const deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM books WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// update book
const updateBook = (id, book) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE books SET ? WHERE id = ?', [book, id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// add category to book
const addCategoryToBook = (bookId, categoryId) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO book_categories (book_id, category_id) VALUES (?, ?)', [bookId, categoryId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
  addCategoryToBook
};
