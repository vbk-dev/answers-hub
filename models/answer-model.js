const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    question_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'questions'
    },
    answer: {
        type: String,
        required: true
    },
    upLikes: [{
        type: mongoose.Types.ObjectId,
        require: false,
        ref: 'users'
    }],
    isVerified: {
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

module.exports = mongoose.model('answers', AnswerSchema);