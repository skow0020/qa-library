import Tutorial from '../models/tutorial';
import Router from 'express';
import TutorialsController from '../controllers/tutorialsController';

const tutorialsRouter = Router();

tutorialsRouter.route('/').get(TutorialsController.apiGetTutorials);
tutorialsRouter.route('/').delete(TutorialsController.apiDeleteTutorials);

tutorialsRouter.post('/', (req, res) => {
  let tutorial = new Tutorial();

  const { backgroundImage, category, language, url, title, body } = req.body;

  tutorial.backgroundImage = backgroundImage;
  tutorial.category = category;
  tutorial.language = language;
  tutorial.url = url;
  tutorial.title = title;
  tutorial.body = body;

  tutorial.save((err, post) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(201).send({ success: true, post });
  });
});

module.exports = tutorialsRouter;