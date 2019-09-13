import OfficeLibraryBook from "../models/officeLibraryBook";

export default class OfficeLibraryBooksController {
  static async apiGetOfficeLibraryBooks(req, res, next) {
    if (req.query.search != null) req.query["$text"] = { $search: req.query.search };
    delete req.query.search;

    OfficeLibraryBook.find(req.query, (err, officeLibraryBook) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: officeLibraryBook });
    });
  }

  static async apiDeleteOfficeLibraryBook(req, res) {
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
  }

  static async apiPostOfficeLibraryBook(req, res) {
    let book = new OfficeLibraryBook({
      title: req.body.title,
      copiesCheckedOut: req.body.copiesCheckedOut,
      author: req.body.author,
      category: req.body.category,
      totalCopies: req.body.totalCopies,
      copiesCheckedOut: req.body.copiesCheckedOut,
      users: req.body.users,
      title: req.body.title,
      body: req.body.body,
      backgroundImage: req.body.backgroundImage
    });

    book.save((err, post) => {
      if (err) return res.json({ success: false, error: err });
      return res.status(201).send({ success: true, post });
    });
  }

  static async apiGetOfficeLibraryBookById(req, res) {
    OfficeLibraryBook.find({ office_book_id: req.params.office_book_id }, (err, book) => {
      if (err) return res.json({ success: false, error: err });

      return res.json({ success: true, data: book });
    });
  }

  static async apiIncrementCopiesCheckedOut(req, res) {
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
    else if (bookInfo[0].userHasCheckedOut) return res.status(200).send({ success: false, error: `User ${req.body.user} already has this book checked out` });
    else if (!bookInfo[0].ableToCheckout) return res.status(200).send({ success: false, error: `All copies are currently checked out` });

    OfficeLibraryBook.findOneAndUpdate({ office_book_id: req.body.office_book_id },
      {
        $inc: { copiesCheckedOut: 1 },
        $push: { users: req.body.user }
      },
      { new: true },
      (err, book) => {
        if (err) return res.json({ success: false, error: err });
        return res.status(200).send({ success: true, book });
      });
  }

  static async apiDecrementCopiesCheckedOut(req, res) {
    if (req.body.user == null) return res.json({ success: false, error: 'Request must include a user' });

    OfficeLibraryBook.findOneAndUpdate({
      office_book_id: req.body.office_book_id,
      users: { $in: [req.body.user] }
    },
      {
        $inc: { copiesCheckedOut: -1 },
        $pull: { users: req.body.user }
      },
      { new: true },
      (err, book) => {
        if (err) return res.json({ success: false, error: err });
        else if (!book) return res.json({ success: false, error: `User ${req.body.user} does not have this book to return` });
        return res.status(200).send({ success: true, book });
      });
  }
}