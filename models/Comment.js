const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  book_ref: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  author_ref: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
