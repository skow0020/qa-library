User = require('../models/user');
express = require('express');

const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: users });
  });
});

usersRouter.get('/:email', (req, res) => {
  const email = req.params.email;
  User.find({ email: email }, (err, users) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: users });
  });
});

usersRouter.delete('/', (req, res) => {
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
});

usersRouter.post('/', (req, res) => {
  let user = new User();

  const { email, githubName, githubAvatarUrl } = req.body;

  user.email = email;
  user.githubName = githubName;
  user.githubAvatarUrl = githubAvatarUrl;

  user.save((err, post) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(201).send({ success: true, post });
  });
});

module.exports = usersRouter;