import Tutorial from '../models/tutorial';
import Router from 'express';

const tutorialsRouter = Router();

tutorialsRouter.get('/', (req, res) => {
  Tutorial.find((err, tutorials) => {
    if (err) return res.json({ success: false, error: err });
    if (typeof req.query.title != 'undefined') {
      tutorials = tutorials.filter(tutorial => tutorial.title.toString().toLowerCase().includes(req.query.title.toLowerCase()) == true);
    }
    if (typeof req.query.category != 'undefined') {
      tutorials = tutorials.filter(tutorial => tutorial.category.toString().toLowerCase() === (req.query.category.toLowerCase()) == true);
    }
    if (typeof req.query.language != 'undefined') {
      tutorials = tutorials.filter(tutorial => tutorial.language);
      tutorials = tutorials.filter(tutorial => tutorial.language.toString().toLowerCase() === (req.query.language.toLowerCase()) == true);
    }
    return res.json({ success: true, data: tutorials });
  });
});

tutorialsRouter.delete('/', (req, res) => {
  if (!req.body.hasOwnProperty('tut_id')) {
    return res.status(500).send({ error: 'Request does not contain tut_id property to delete' });
  }
  const { tut_id } = req.body;
  Tutorial.findOneAndRemove({ tut_id: tut_id }, (err, tutorial) => {
    if (tutorial === null) return res.status(500).send({ error: `Unable to find tutorial id: ${tut_id}` });
    const response = {
      message: "Tutorial successfully deleted",
      tut_id: tutorial._id
    };
    return res.status(200).send(response);
  });
});

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