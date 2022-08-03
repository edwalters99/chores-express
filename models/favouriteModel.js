const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // defines which model's ObjectId
    },
    title: {
      type: String,
      required: [true, 'Please supply a title'],
    },
    desc: {
      type: String,
      required: [true, 'Please supply a description'],
    },
    value: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      required: [true, 'Please supply a value'],
    },
    icon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// imported in controller
module.exports = mongoose.model('Favourite', favouriteSchema); 
