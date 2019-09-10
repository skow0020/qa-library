import Article from '../models/article';
import Router from 'express';
import ArticlesController from '../controllers/articlesController';

const articlesRouter = new Router();

articlesRouter.route('/').get(ArticlesController.apiGetArticles);
articlesRouter.route('/').delete(ArticlesController.apiDeleteArticle);

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