const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UsersSchema = new Schema(
  {
    githubName: {
      type: String,
      required: [true, 'github name is required']
    },
    githubAvatarUrl: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    }
  },
  { timestamps: true }
);
UsersSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

module.exports = mongoose.model('User', UsersSchema);