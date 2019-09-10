import ResourceLink from '../models/resourceLink';
import Router from 'express';
import ResourceLinksRouter from '../controllers/resourceLinksController';

const resourceLinksRouter = Router();

resourceLinksRouter.route('/').get(ResourceLinksRouter.apiGetResourceLinks);
resourceLinksRouter.route('/').delete(ResourceLinksRouter.apiDeleteResourceLink);

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