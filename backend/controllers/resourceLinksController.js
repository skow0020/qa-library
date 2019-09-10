import ResourceLink from "../models/resourceLink";

export default class ResourceLinksController {
  static async apiGetResourceLinks(req, res, next) {
    if (req.query.search != null) req.query["$text"] = { $search: req.query.search };
    delete req.query.search;

    ResourceLink.find(req.query, (err, resourceLinks) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: resourceLinks });
    });
  }

  static async apiDeleteResourceLink(req, res) {
    if (!req.body.hasOwnProperty('res_id')) {
      return res.status(500).send({ error: 'Request does not contain res_id property to delete' });
    }

    const { res_id } = req.body;
    ResourceLink.findOneAndRemove({ res_id: res_id }, (err, resourceLink) => {
      if (resourceLink === null) return res.status(500).send({ error: `Unable to find resource link id: ${res_id}` });
      const response = {
        message: "Resource Link successfully deleted",
        res_id: resourceLink._id
      };
      return res.status(200).send(response);
    });
  }

  static async apiPostResourceLink(req, res) {
    let resourceLink = new ResourceLink({
      backgroundImage: req.body.backgroundImage,
      category: req.body.category,
      language: req.body.language,
      url: req.body.url,
      title: req.body.title,
      body: req.body.body
    });

    resourceLink.save((err, post) => {
      if (err) return res.json({ success: false, error: err });
      return res.status(201).send({ success: true, post });
    });
  }
}