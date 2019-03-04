const mongoose = require('mongoose');
const environment = require('../../configuration/environment');
const jwt = require('jsonwebtoken');

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
    },
    isAdmin: Boolean
});

schema.methods.generateAuthToken = function(){
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin },
        environment.jwtSecretKey,
         { expiresIn: environment.jwtExpiresInSeconds });
}
const User = mongoose.model('User', schema);
module.exports = User;