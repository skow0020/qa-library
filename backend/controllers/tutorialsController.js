import Tutorial from "../models/tutorial";

export default class TutorialsController {
  static async apiGetTutorials(req, res, next) {
    if (req.query.search != null) req.query["$text"] = { $search: req.query.search };
    delete req.query.search;

    Tutorial.find(req.query, (err, tutorials) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({
        success: true, data: tutorials
      });
    });
  }

  static async apiDeleteTutorials(req, res) {
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
  }

  static async apiPostTutorial(req, res) {
    let tutorial = new Tutorial({
      backgroundImage: req.body.backgroundImage,
      category: req.body.category,
      language: req.body.language,
      url: req.body.url,
      title: req.body.title,
      body: req.body.body
    });

    tutorial.save((err, post) => {
      if (err) return res.json({ success: false, error: err });
      return res.status(201).send({ success: true, post });
    });
  }
}