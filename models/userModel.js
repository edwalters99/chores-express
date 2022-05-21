const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please supply a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please supply email address"],
        unique: true
    },
    password: {
       type: String,
       required: [true, "Please supply a password"], 
    },
    familyname: {
        type: String,
        required: [true, "Please supply a family name"], 
    }
}, 
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);   // imported in controller