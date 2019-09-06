import OfficeLibraryBook from '../models/officeLibraryBook';
import Router from 'express';

const officeLibraryBooksRouter = Router();

officeLibraryBooksRouter.get('/', (req, res) => {
  OfficeLibraryBook.find((err, books) => {
    if (err) return res.json({ success: false, error: err });
    if (typeof req.query.title != 'undefined') {
      books = books.filter(book => book.title.toString().toLowerCase().includes(req.query.title.toLowerCase()) == true);
    }
    if (typeof req.query.category != 'undefined') {
      books = books.filter(book => book.category.toString().toLowerCase() === (req.query.category.toLowerCase()) == true);
    }
    return res.json({ success: true, data: books });
  });
});

officeLibraryBooksRouter.get('/:office_book_id', (req, res) => {
  OfficeLibraryBook.find({ office_book_id: req.params.office_book_id }, (err, book) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, data: book });
  });
});

officeLibraryBooksRouter.delete('/', (req, res) => {
  if (!req.body.hasOwnProperty('office_book_id')) {
    return res.status(500).send({ error: 'Request does not contain office_book_id property to delete' });
  }
  const { office_book_id } = req.body;
  OfficeLibraryBook.findOneAndRemove({ office_book_id: office_book_id }, (err, book) => {
    if (book === null) return res.status(500).send({ error: `Unable to find officeLibraryBook id: ${office_book_id}` });
    const response = {
      message: "Office book successfully deleted",
      office_book_id: book._id
    };
    return res.status(200).send(response);
  });
});

officeLibraryBooksRouter.post('/', (req, res) => {
  let book = new OfficeLibraryBook();

  const { backgroundImage, author, category, totalCopies, title, body, users, copiesCheckedOut } = req.body;

  book.title = title;
  book.copiesCheckedOut = copiesCheckedOut;
  book.author = author;
  book.category = category;
  book.totalCopies = totalCopies;
  book.copiesCheckedOut = copiesCheckedOut ? copiesCheckedOut : 0;
  book.users = users;
  book.title = title;
  book.body = body;
  book.backgroundImage = backgroundImage;

  book.save((err, post) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(201).send({ success: true, post });
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