const mongoose = require('mongoose');
//const Author = require('./author');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true
        //match: /pattern/
        //lowercase: true,
        //uppercase: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Web', 'Mobile', 'Network']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    likes: {
        type: Number,
        min: 0
    },
    dislikes: {
        type: Number,
        min: 0
    },
    uploadedDate: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', schema);
module.exports = Blog;