const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 128
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: false
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        require: false,
        ref: 'users'
    }],
    isAnswered: {
        type: Boolean,
        required: true,
        default: false
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    postedOn: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('questions', QuestionSchema);