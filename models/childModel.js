const mongoose = require('mongoose');

const childSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  // defines which model's ObjectId
    },
    firstname: {
        type: String,
        required: [true, "Please supply a first name"]
    },
    dob: {
       type: Date,
       required: [true, "Please supply a date of birth"], 
    },
    username: {
        type: String,
        required: [true, "Please supply a username"], 
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please supply a password"], 
    },
    rewardbal: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        default: 0
    },
    completed: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        default: 0
    },
    color: {
        type: String,
        required: [true, "Please select a favourite colour"],
        enum: ['Blue', 'Green', 'Red', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown']
    },
    avatar: {
        type: String,
        required: [true, "Please select an avatar"],
        enum: ['Dino', 'Cat', 'Dog', 'Rabbit']
    }
}, 
{
    timestamps: true,
});

module.exports = mongoose.model('Child', childSchema);   // imported in controller