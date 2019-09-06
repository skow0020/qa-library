import ResourceLink from '../models/resourceLink';
import Router from 'express';

const resourceLinksRouter = Router();

resourceLinksRouter.get('/', (req, res) => {
  ResourceLink.find((err, resourceLinks) => {
    if (err) return res.json({ success: false, error: err });
    if (typeof req.query.title != 'undefined') {
      resourceLinks = resourceLinks.filter(resourceLink => resourceLink.title.toString().toLowerCase().includes(req.query.title.toLowerCase()) == true);
    }
    if (typeof req.query.category != 'undefined') {
      resourceLinks = resourceLinks.filter(resourceLink => resourceLink.category.toString().toLowerCase() === (req.query.category.toLowerCase()) == true);
    }
    if (typeof req.query.language != 'undefined') {
      resourceLinks = resourceLinks.filter(resourceLinks => resourceLinks.language);
      resourceLinks = resourceLinks.filter(resourceLinks => resourceLinks.language.toString().toLowerCase() === (req.query.language.toLowerCase()) == true);
    }
    return res.json({ success: true, data: resourceLinks });
  });
});

resourceLinksRouter.delete('/', (req, res) => {
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
});

resourceLinksRouter.post('/', (req, res) => {
  let resourceLink = new ResourceLink();

  const { backgroundImage, category, language, url, title, body } = req.body;

  resourceLink.backgroundImage = backgroundImage;
  resourceLink.category = category;
  resourceLink.language = language;
  resourceLink.url = url;
  resourceLink.title = title;
  resourceLink.body = body;

  resourceLink.save((err, post) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(201).send({ success: true, post });
  });
});

module.exports = resourceLinksRouter;