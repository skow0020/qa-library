import Book from "../models/book";

export default class BooksController {
  static async apiGetBooks(req, res, next) {
    if (req.query.search != null) req.query["$text"] = { $search: req.query.search };

    delete req.query.search;
    Book.find(req.query, (err, books) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: books });
    });
  }

  static async apiDeleteBook(req, res, next) {
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
  }

  static async apiPostBook(req, res) {
    let book = new Book({
      backgroundImage: req.body.backgroundImage,
      author: req.body.author,
      category: req.body.category,
      language: req.body.language,
      url: req.body.url,
      title: req.body.title,
      body: req.body.body,
      pdf: req.body.pdf
    });

    book.save((err, post) => {
      if (err) return res.json({ success: false, error: err });
      return res.status(201).send({ success: true, post });
    });
  }
}