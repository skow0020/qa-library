import Router from 'express';
import OfficeLibraryBooksController from '../controllers/officeLibraryBooksController';

const officeLibraryBooksRouter = Router();

officeLibraryBooksRouter.route('/').get(OfficeLibraryBooksController.apiGetOfficeLibraryBooks);
officeLibraryBooksRouter.route('/').delete(OfficeLibraryBooksController.apiDeleteOfficeLibraryBook);
officeLibraryBooksRouter.route('/').post(OfficeLibraryBooksController.apiPostOfficeLibraryBook);
officeLibraryBooksRouter.route('/:office_book_id').get(OfficeLibraryBooksController.apiGetOfficeLibraryBookById);
officeLibraryBooksRouter.route('/incrementCopiesCheckedOut').patch(OfficeLibraryBooksController.apiIncrementCopiesCheckedOut);
officeLibraryBooksRouter.route('/decrementCopiesCheckedOut').patch(OfficeLibraryBooksController.apiDecrementCopiesCheckedOut);

module.exports = officeLibraryBooksRouter;