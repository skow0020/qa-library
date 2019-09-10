import Book from '../models/book';
import Router from 'express';
import BooksController from '../controllers/booksController';

const booksRouter = Router();

booksRouter.route('/').get(BooksController.apiGetBooks);

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