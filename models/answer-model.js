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
    votes: [{
        type: mongoose.Types.ObjectId,
        require: false,
        ref: 'users'
    }],
    comments: [{
        comment: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 128
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users'
        },
        postedOn: {
            type: Date,
            required: true,
            default: Date.now
        }
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