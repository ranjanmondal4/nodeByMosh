const mongoose = require('mongoose');
    
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        lowercase: true,
        //uppercase: true,
        trim: true
        //match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['Web', 'Mobile', 'Network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            //isAsync: true,
            // validator: function (v, callback) {
            //     setTimeout(() => {
            //         // some usefull work
            //         let isValid = v && v.every(
            //             (tag) => (typeof tag == 'string') &&
            //             tag.length > 0);
            //         callback(isValid);
            //     }, 4000);
            //  },
            validator: function (tags) {
                return tags && tags.every(
                    (tag) => (typeof tag == 'string') &&
                    tag.length > 0);
            },
            message: 'Atleast one tag should be present'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){
            return this.isPublished;
        },
        min: 10,
        max: 100,
        get: v => Math.round(v),
        set: v => Math.round(v),
    }
});

const Course = mongoose.model('Course', schema);
module.exports = Course;