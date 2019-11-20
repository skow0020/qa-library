import GithubController from '../controllers/githubController';
import Router from 'express';

const githubRouter = Router();

githubRouter.route('/login').get(GithubController.githubLogin);
githubRouter.route('/auth/github/callback').all(GithubController.githubCallback);
githubRouter.route('/user').get(GithubController.githubUser);

module.exports = githubRouter;