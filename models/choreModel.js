const mongoose = require('mongoose');

const choreSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  // defines which model's ObjectId
    },
    child: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Child'  
    },
    title: {
        type: String,
        required: [true, "Please supply a title"]
    },
    desc: {
       type: String,
    },
    value: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: [true, "Please supply a value"]
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
}, 
{
    timestamps: true,
});

module.exports = mongoose.model('Chore', choreSchema);   // imported in controller