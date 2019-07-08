Book = require('../models/book');
express = require('express');

const booksRouter = express.Router();

booksRouter.get('/', (req, res) => {
  Book.find((err, books) => {
    if (err) return res.json({ success: false, error: err });
    if (typeof req.query.title != 'undefined') {
      books = books.filter(book => book.title.toString().toLowerCase().includes(req.query.title.toLowerCase()) == true);
    }
    if (typeof req.query.category != 'undefined') {
      books = books.filter(book => book.category.toString().toLowerCase() === (req.query.category.toLowerCase()) == true);
    }
    if (typeof req.query.language != 'undefined') {
      books = books.filter(books => books.language);
      books = books.filter(books => books.language.toString().toLowerCase() === (req.query.language.toLowerCase()) == true);
    }
    return res.json({ success: true, data: books });
  });
});

booksRouter.delete('/', (req, res) => {
  if (!req.body.hasOwnProperty('book_id')) {
    return res.status(500).send({ error: 'Request does not contain book_id property to delete' });
  }
  const { book_id } = req.body;
  Book.findOneAndRemove({ book_id: book_id }, (err, book) => {
    if (book === null) return res.status(500).send({ error: `Unable to find book id: ${book_id}` });
    const response = {
      message: "Book successfully deleted",
      book_id: book._id
    };
    return res.status(200).send(response);
  });
});

booksRouter.post('/', (req, res) => {
  let book = new Book();

  const { backgroundImage, author, category, language, url, title, body, pdf } = req.body;

  book.backgroundImage = backgroundImage;
  book.author = author;
  book.category = category;
  book.language = language;
  book.url = url;
  book.title = title;
  book.body = body;
  book.pdf = pdf;

  book.save((err, post) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(201).send({ success: true, post });
  });
});

module.exports = booksRouter;