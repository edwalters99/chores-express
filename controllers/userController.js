const asyncHandler = require('express-async-handler'); // enables wrapping of controller functions so inside can use async/await
const bcrypt = require('bcryptjs'); // password hashing
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


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
    }
    // find if user already exists
    const emailExists = await User.findOne({email});
    const usernameExists = await User.findOne({username});

    if (emailExists) {
        res.status(400);
        throw new Error('Email address already exists');
    };

    if (usernameExists) {
        res.status(400);
        throw new Error('Username already exists');
    };

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
        username,
        email,
        familyname,
        password: hashedPassword  // very important!
    });

    // generateToken is a custom function to return a signed token(requires user id)
    if(user) {
        res.status(201).json({
           _id: user._id,
           username: user.username,
           email: user.email,
           familyname: user.familyname,
           token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new error('Invalid user data');
    }
});


// @desc       Login a user
// @route      /api/users/login
// @access     Public
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    // find user
    const user = await User.findOne({username});

     // if user found and passwords match
     if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    };
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
 


module.exports = {
    registerUser,
    loginUser
};
//exports used in UserRoutes