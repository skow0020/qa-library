import Article from '../models/article';
import Router from 'express';
import ArticlesController from '../controllers/articlesController';

const articlesRouter = new Router();

articlesRouter.route('/').get(ArticlesController.apiGetArticles);

articlesRouter.delete('/', (req, res) => {
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
});

articlesRouter.post('/', (req, res) => {
  let article = new Article();

  const { backgroundImage, author, category, language, url, title, body } = req.body;

  article.backgroundImage = backgroundImage;
  article.author = author;
  article.category = category;
  article.language = language;
  article.url = url;
  article.title = title;
  article.body = body;

  article.save((err, post) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(201).send({ success: true, post });
  });
});

module.exports = articlesRouter;