import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const OfficeLibraryBook = new Schema(
  {
    author: {
      type: String,
      required: [true, 'Author is required']
    },
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    totalCopies: {
      type: Number,
      required: [true, 'Total copies is required'],
      min: [1, 'Must be at least 1 copy']
    },
    copiesCheckedOut: {
      type: Number,
      min: [0, 'copies checked out cannot be negative'],
      default: 0
    },
    users: {
      type: Array,
      required: [true, 'Users array is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    backgroundImage: {
      type: String,
      required: [true, 'Background Image is required']
    },
    body: {
      type: String
    }
  },
  { timestamps: true }
);
OfficeLibraryBook.plugin(AutoIncrement, {inc_field: 'office_book_id'});

module.exports = mongoose.model('OfficeLibraryBook', OfficeLibraryBook);