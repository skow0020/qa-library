import Router from 'express';
import UsersController from '../controllers/usersController';

const usersRouter = Router();

usersRouter.route('/').get(UsersController.apiGetUsers);
usersRouter.route('/').delete(UsersController.apiDeleteUser);
usersRouter.route('/:email').get(UsersController.apiGetUserByEmail);
usersRouter.route('/register').post(UsersController.apiRegisterUser);
usersRouter.route('/authenticate').post(UsersController.apiAuthenticate);

module.exports = usersRouter;