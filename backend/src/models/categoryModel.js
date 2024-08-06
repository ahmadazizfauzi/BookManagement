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
    process.exit(1); // Hentikan proses jika gagal terhubung ke database
  }
  console.log('Connected to the MySQL database');
});

const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM categories', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

const createCategory = (category) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO categories SET ?', category, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

const updateCategory = (id, category) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE categories SET name = ? WHERE id = ?', [category.name, id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory
};
