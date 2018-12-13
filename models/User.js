const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  premium: {
    type: Boolean,
    default: false
  },
  tagged_books: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false
  }
});

module.exports = mongoose.model('User', UserSchema);
