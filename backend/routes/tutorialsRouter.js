import Router from 'express';
import TutorialsController from '../controllers/tutorialsController';

const tutorialsRouter = Router();

tutorialsRouter.route('/').get(TutorialsController.apiGetTutorials);
tutorialsRouter.route('/').delete(TutorialsController.apiDeleteTutorials);
tutorialsRouter.route('/').post(TutorialsController.apiPostTutorial);

module.exports = tutorialsRouter;