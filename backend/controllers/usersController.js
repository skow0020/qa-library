import User from "../models/user";

export default class UsersController {
  static async apiGetUsers(req, res, next) {
    User.find(req.query, (err, users) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: users });
    });
  }
}