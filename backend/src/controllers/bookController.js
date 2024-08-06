const bookModel = require('../models/bookModel');
const categoryModel = require('../models/categoryModel');

// get books
const getBooks = async (req, res) => {
  try {
    const books = await bookModel.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('An error occurred');
  }
};

// get by id
const getBookById = async (req, res) => {
  try {
    const book = await bookModel.getBookById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).send('An error occurred');
  }
};

// add bok
const addBook = async (req, res) => {
  try {
    const { title, author, publisher, pages, publication_date, description, categories } = req.body;
    const id = await bookModel.createBook({ title, author, publisher, pages, publication_date, description });

    if (categories && categories.length > 0) {
      for (const categoryId of categories) {
        await bookModel.addCategoryToBook(id, categoryId);
      }
    }

    res.status(201).json({ id });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).send('An error occurred');
  }
};

// delete book
const deleteBook = async (req, res) => {
  try {
    const affectedRows = await bookModel.deleteBook(req.params.id);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).send('An error occurred');
  }
};

// update book
const updateBook = async (req, res) => {
  try {
    const affectedRows = await bookModel.updateBook(req.params.id, req.body);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Book updated successfully' });
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).send('An error occurred');
  }
};

// export
module.exports = {
  getBooks,
  getBookById,
  addBook,
  deleteBook,
  updateBook
};
