import OfficeLibraryBook from '../models/officeLibraryBook';
import Router from 'express';
import OfficeLibraryBooksController from '../controllers/officeLibraryBooksController';

const officeLibraryBooksRouter = Router();

officeLibraryBooksRouter.route('/').get(OfficeLibraryBooksController.apiGetOfficeLibraryBooks);
officeLibraryBooksRouter.route('/').delete(OfficeLibraryBooksController.apiDeleteOfficeLibraryBook);
officeLibraryBooksRouter.route('/').post(OfficeLibraryBooksController.apiPostOfficeLibraryBook);

officeLibraryBooksRouter.get('/:office_book_id', (req, res) => {
  OfficeLibraryBook.find({ office_book_id: req.params.office_book_id }, (err, book) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, data: book });
  });
});

officeLibraryBooksRouter.patch('/incrementCopiesCheckedOut', async (req, res) => {
  if (req.body.user == null) return res.json({ success: false, error: 'Request must include a user' });

  const bookInfo = await OfficeLibraryBook.aggregate([
    { '$match': { office_book_id: req.body.office_book_id } },
    {
      '$project': {
        'ableToCheckout': {
          '$cond': [{ '$lt': ['$copiesCheckedOut', '$totalCopies'] }, true, false]
        },
        'userHasCheckedOut': {
          '$cond': [{ '$in': [req.body.user, '$users'] }, true, false]
        }
      }
    }
  ]);

  if (bookInfo === undefined || bookInfo.length == 0) return res.status(200).send({ success: false, error: `Unable to find book to check out with id ${req.body.office_book_id}` });
  else if (!bookInfo[0].ableToCheckout) return res.status(200).send({ success: false, error: `All copies are currently checked out` });
  else if (bookInfo[0].userHasCheckedOut) return res.status(200).send({ success: false, error: `User ${req.body.user} already has this book checked out` });
  else {
    OfficeLibraryBook.findOneAndUpdate({ office_book_id: req.body.office_book_id },
      {
        $inc: { copiesCheckedOut: 1 },
        $push: { users: req.body.user }
      },
      { new: true },
      (err, book) => {
        if (err) return res.json({ success: false, error: err });
        else if (!book) return res.json({ success: false, error: `User ${req.body.user} already has this book checked out` });
        return res.status(200).send({ success: true, book });
      });
  }
});

officeLibraryBooksRouter.patch('/decrementCopiesCheckedOut', async (req, res) => {
  if (req.body.user == null) return res.json({ success: false, error: 'Request must include a user' });

  const bookInfo = await OfficeLibraryBook.aggregate([
    { '$match': { office_book_id: req.body.office_book_id } },
    {
      '$project': {
        'ableToReturn': {
          '$cond': [{ '$gt': ['$copiesCheckedOut', 0] }, true, false]
        },
        'userHasCheckedOut': {
          '$cond': [{ '$in': [req.body.user, '$users'] }, true, false]
        }
      }
    }
  ]);

  if (bookInfo === undefined || bookInfo.length == 0) return res.status(200).send({ success: false, error: `Unable to find book to return with id ${req.body.office_book_id}` });
  else if (!bookInfo[0].ableToReturn) return res.status(200).send({ success: false, error: `All copies are currently returned and available` });
  else if (!bookInfo[0].userHasCheckedOut) return res.status(200).send({ success: false, error: `User ${req.body.user} does not have this book to return` });
  else {
    OfficeLibraryBook.findOneAndUpdate({
      office_book_id: req.body.office_book_id,
      copiesCheckedOut: { $gt: 0 },
      users: { $in: [req.body.user] }
    },
      {
        $inc: { copiesCheckedOut: -1 },
        $pull: { users: req.body.user }
      },
      { new: true },
      (err, book) => {
        if (err) return res.json({ success: false, error: err });
        else if (!book) return res.json({ success: false, error: `Unable to return book` });
        return res.status(200).send({ success: true, book });
      });
  }
});

module.exports = officeLibraryBooksRouter;