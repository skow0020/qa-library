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

  static async apiDeleteArticle(req, res) {
    if (!req.body.hasOwnProperty('article_id')) {
      return res.status(500).send({ error: 'Request does not contain article_id property to delete' });
    }
    
    const { article_id } = req.body;
    Article.findOneAndRemove({ article_id: article_id }, (err, article) => {
      if (article === null) return res.status(500).send({ error: `Unable to find article id: ${article_id}` });
      const response = {
        message: "Article successfully deleted",
        article_id: article._id
      };
      return res.status(200).send(response);
    });
  }
}