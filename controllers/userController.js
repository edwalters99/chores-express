const asyncHandler = require("express-async-handler"); // enables wrapping of controller functions so inside can use async/await
const bcrypt = require("bcryptjs"); // password hashing
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc       Register a new user
// @route      /api/users
// @access     Public

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, familyname, pin } = req.body;

  // Validation
  if (!email || !password || !familyname || !pin) {
    res.status(400); // client error
    throw new Error("Please include all fields");
  }
  // find if user already exists
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("Email address already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    email,
    password: hashedPassword, // very important!
    familyname,
    pin,
  });

  // generateToken is a custom function to return a signed token(requires user id)
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      familyname: user.familyname,
      pin: user.pin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("Invalid user data");
  }
});

// @desc       Login a user
// @route      /api/users/login
// @access     Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find user
  const user = await User.findOne({ email });

  // if user found and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      familyname: user.familyname,
      pin: user.pin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc  Get current user
// @ route /api/users/getcurrent
// @ access Private

// req.user is assigned in authMiddleware.js

// const getCurrentUser = asyncHandler(async (req, res) => {
//   const user = {
//     id: req.user._id,
//     email: req.user.email,
//     familyname: req.user.familyname,
//     pin: req.user.pin,
//   };
//   res.status(200).json(user);
// });

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//imported in UserRoutes
module.exports = {
  registerUser,
  loginUser
  // getCurrentUser
};

// getCurrentUser not yet implemented
