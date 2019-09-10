import User from '../models/user';
import Router from 'express';
import UsersController from '../controllers/usersController';

const usersRouter = Router();

usersRouter.route('/').get(UsersController.apiGetUsers);
usersRouter.route('/').delete(UsersController.apiDeleteUser);

usersRouter.get('/:email', (req, res) => {
  const email = req.params.email;
  User.find({ email: email }, (err, users) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: users });
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