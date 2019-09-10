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
}