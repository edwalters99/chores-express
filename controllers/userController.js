const asyncHandler = require('express-async-handler'); // enables wrapping of controller functions so inside can use async/await

// @desc       Register a new user
// @route      /api/users
// @access     Public

const registerUser = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const {username, email, password, familyname, } = req.body; 

    // Validation
    if(!username || !email || !password || !familyname) {
        res.status(400); // client error
        throw new Error('Please include all fields');
    };
});


// @desc       Login a user
// @route      /api/users/login
// @access     Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login Route');
})

module.exports = {
    registerUser,
    loginUser
};
//exports used in UserRoutes