const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Child = require('../models/childModel');

// @desc  Get user's children
// @ route GET /api/childs
// @ access Private


const getChilds = asyncHandler(async (req, res) => {

    res.status(200).json({message: 'getchilds'});
});

// @desc  Create new child
// @ route POST /api/childs
// @ access Private

const createChild = asyncHandler(async (req, res) => {

    res.status(200).json({message: 'createchild'});
});

// user in routes
module.exports = {
    getChilds,
    createChild
};