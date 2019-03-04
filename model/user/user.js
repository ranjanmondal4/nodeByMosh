const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: /.*@.*/
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024
    }
});

const User = mongoose.model('User', schema);
module.exports = User;