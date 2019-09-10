import Book from '../models/book';
import Router from 'express';
import BooksController from '../controllers/booksController';

const booksRouter = Router();

booksRouter.route('/').get(BooksController.apiGetBooks);
booksRouter.route('/').delete(BooksController.apiDeleteBook);

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