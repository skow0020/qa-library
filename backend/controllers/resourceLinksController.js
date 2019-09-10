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
}