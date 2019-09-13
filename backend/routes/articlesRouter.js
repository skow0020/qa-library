import Router from 'express';
import ArticlesController from '../controllers/articlesController';

const articlesRouter = new Router();

articlesRouter.route('/').get(ArticlesController.apiGetArticles);
articlesRouter.route('/').delete(ArticlesController.apiDeleteArticle);
articlesRouter.route('/').post(ArticlesController.apiPostArticle);

module.exports = articlesRouter;