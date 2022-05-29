const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    },
    pin: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: [true, "Please supply a 4 digit PIN"]
    }
}, 
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);   // imported in controller