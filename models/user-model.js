const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 32,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 32,
        minlength: 2
    }, 
    email: {
        type: String,
        required: true,
        maxlength: 128,
        minlength: 5
    }, 
    hashedPassword: {
        type: String,
        required: false
    }, 
    joinedOn: {
        type: Date,
        required: true,
        default: Date.now
    }, 
    score: {
        type: Number,
        required: true,
        default: 0
    }, 
    status: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Users', UserSchema);