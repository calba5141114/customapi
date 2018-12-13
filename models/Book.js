const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    summary: {
        type: String,
        default: "No Summary."
    },
    url: {
        type: String,
        require: true
    },
    posted_at: {
        type: Date,
        default: new Date
    },
    private: {
        type: Boolean,
        default: false
    },
    poster_ref: {
        type: mongoose.Schema.Types.ObjectId
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    }
});

module.exports = mongoose.model('Book', BookSchema);