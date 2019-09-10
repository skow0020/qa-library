import Book from "../models/book";

export default class BooksController {
  static async apiGetBooks(req, res, next) {
    if (req.query.search != null) req.query["$text"] = { $search: req.query.search };
    delete req.query.search;

    delete req.query.search;
    Book.find(req.query, (err, books) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: books });
    });
  }
}