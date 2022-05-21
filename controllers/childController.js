const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Child = require('../models/childModel');

// @desc  Get user's children
// @ route GET /api/children
// @ access Private


const getChildren = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    };

    const children = await Child.find({user: req.user.id});

    res.status(200).json(children);
});

// @desc  Create new child
// @ route POST /api/children
// @ access Private

const createChild = asyncHandler(async (req, res) => {
    const { firstname, dob, rewardbal, choresdone, color, avatar } = req.body;
    if (!firstname || !dob || !color || !avatar ) {
        res.status(400);
        throw new Error('Incomplete data supplied for new Child');
    }
     // Get user using the id in the JWT
     const user = await User.findById(req.user.id);

     if (!user) {
         res.status(401);
         throw new Error('User not found');
     };

     const child = await Child.create({
         firstname,
         dob,
         color,
         avatar,
         user: req.user.id
     }); 

    res.status(201).json(child);
});

// user in routes
module.exports = {
    getChildren,
    createChild
};