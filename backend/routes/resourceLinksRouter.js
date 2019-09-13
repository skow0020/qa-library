import Router from 'express';
import ResourceLinksRouter from '../controllers/resourceLinksController';

const resourceLinksRouter = Router();

resourceLinksRouter.route('/').get(ResourceLinksRouter.apiGetResourceLinks);
resourceLinksRouter.route('/').delete(ResourceLinksRouter.apiDeleteResourceLink);
resourceLinksRouter.route('/').post(ResourceLinksRouter.apiPostResourceLink);

module.exports = resourceLinksRouter;