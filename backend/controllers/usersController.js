import User from "../models/user";

export default class UsersController {
  static async apiGetUsers(req, res, next) {
    User.find(req.query, (err, users) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: users });
    });
  }

  static async apiDeleteUser(req, res) {
    if (!req.body.hasOwnProperty('user_id')) {
      return res.status(500).send({ error: 'Request does not contain user_id property to delete' });
    }
    const { user_id } = req.body;
    User.findOneAndRemove({ user_id: user_id }, (err, user) => {
      if (user === null) return res.status(500).send({ error: `Unable to find user id: ${user_id}` });
      const response = {
        message: "User successfully deleted",
        user_id: user._id
      };
      return res.status(200).send(response);
    });
  }

  static async apiPostUser(req, res) {
    let user = new User({
      email: req.body.email,
      githubName: req.body.githubName,
      githubAvatarUrl: req.body.githubAvatarUrl
    });

    user.save((err, post) => {
      if (err) return res.json({ success: false, error: err });
      return res.status(201).send({ success: true, post });
    });
  }

  static async apiGetUserByEmail(req, res) {
    User.find({ email: req.params.email }, (err, user) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: user });
    });
  }
}