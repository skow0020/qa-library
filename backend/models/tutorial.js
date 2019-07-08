const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TutorialSchema = new Schema(
  {
    backgroundImage: {
      type: String,
      required: [true, 'Background image url is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    language: {
      type: String
    },
    url: {
      type: String,
      required: [true, 'Url is required']
    },
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    body: {
      type: String
    }
  },
  { timestamps: true }
);
TutorialSchema.plugin(AutoIncrement, {inc_field: 'tut_id'});

module.exports = mongoose.model('Tutorial', TutorialSchema);