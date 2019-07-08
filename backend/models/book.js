const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BookSchema = new Schema(
  {
    backgroundImage: {
      type: String,
      required: [true, 'Background image url is required']
    },
    author: {
      type: String,
      required: [true, 'Author is required']
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
    pdf: {
      type: String
    },
    body: {
      type: String
    }
  },
  { timestamps: true }
);
BookSchema.plugin(AutoIncrement, {inc_field: 'book_id'});

module.exports = mongoose.model('Book', BookSchema);