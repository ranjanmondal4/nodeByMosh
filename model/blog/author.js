const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true,
        lowercase: true,
        //match: /pattern/
        //uppercase: true,
    },
    lastName: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 100,
        trim: true,
        lowercase: true,
    },
    nationality: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        uppercase: true
    }
});

const Author = mongoose.model('Author', schema);
module.exports = Author;