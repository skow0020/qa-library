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
}