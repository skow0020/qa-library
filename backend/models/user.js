import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
  },
  { timestamps: true }
);

const saltRounds = 10;

UsersSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      (err, hashedPassword) => {
        if (err) next(err);
        else {
          document.password = hashedPassword;
          next();
        }
      });
  } else next();
});

UsersSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) callback(err);
    else callback(err, same);
  });
};

UsersSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

module.exports = mongoose.model('User', UsersSchema);