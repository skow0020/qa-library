import * as jwt from 'jsonwebtoken';

import User from "../models/user";

const secret = process.env.JWT_SECRET;

export default class UsersController {
  static async apiGetUsers(req, res, next) {
    User.find(req.query, 'email user_id', (err, users) => {
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

  static async apiRegisterUser(req, res) {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err) return res.status(500).json({ error: 'Internal error please try again' });
      else if (user) return res.status(200).json({ success: false, error: `User with email: ${email} already exists` });

      let newUser = new User({ email, password });

      newUser.save((err, post) => {
        if (err) return res.status(500).send({ success: false, error: err });
        return res.status(200).send({ success: true, email });
      });
    });
  }

  static async apiAuthenticate(req, res) {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err) return res.status(500).json({ error: 'Internal error please try again' });
      else if (!user) return res.status(401).json({ error: 'Incorrect email or password' });

      user.isCorrectPassword(password, (err, same) => {
        if (err) return res.status(500).json({ error: 'Internal error please try again' });
        else if (!same) returnres.status(401).json({ error: 'Incorrect email or password' });

        const payload = { email };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).status(200).json({ success: true });
      });
    });
  }

  static async apiGetUserByEmail(req, res) {
    User.findOne({ email: req.params.email }, 'email user_id', (err, user) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: user });
    });
  }
}