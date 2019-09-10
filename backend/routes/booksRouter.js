import Router from 'express';
import BooksController from '../controllers/booksController';

const booksRouter = Router();

booksRouter.route('/').get(BooksController.apiGetBooks);
booksRouter.route('/').delete(BooksController.apiDeleteBook);
booksRouter.route('/').post(BooksController.apiPostBook);

module.exports = booksRouter;