import User from '../models/user';
import Router from 'express';
import UsersController from '../controllers/usersController';

const usersRouter = Router();

usersRouter.route('/').get(UsersController.apiGetUsers);
usersRouter.route('/').delete(UsersController.apiDeleteUser);
usersRouter.route('/').post(UsersController.apiPostUser);

usersRouter.get('/:email', (req, res) => {
  const email = req.params.email;
  User.find({ email: email }, (err, users) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: users });
  });
});

module.exports = usersRouter;