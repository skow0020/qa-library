import Router from 'express';
import UsersController from '../controllers/usersController';

const usersRouter = Router();

usersRouter.route('/').get(UsersController.apiGetUsers);
usersRouter.route('/').delete(UsersController.apiDeleteUser);
usersRouter.route('/').post(UsersController.apiPostUser);
usersRouter.route('/:email').get(UsersController.apiGetUserByEmail);

module.exports = usersRouter;