import Tutorial from "../models/tutorial";

export default class TutorialsController {
  static async apiGetTutorials(req, res, next) {
    if (req.query.search != null) req.query["$text"] = { $search: req.query.search };
    delete req.query.search;
    
    Tutorial.find(req.query, (err, tutorials) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: tutorials
       });
    });
  }
}