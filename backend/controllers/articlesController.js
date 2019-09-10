import Article from "../models/article";

export default class ArticlesController {
  static async apiGetArticles(req, res, next) {
    if (req.query.search != null) req.query["$text"] = { $search: req.query.search }; 
    delete req.query.search;

    Article.find(req.query, (err, articles) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: articles });
    });
  }
}