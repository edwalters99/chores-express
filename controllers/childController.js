const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Child = require("../models/childModel");

// @desc  Get user's children
// @ route GET /api/children
// @ access Private

const getChildren = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const children = await Child.find({ user: req.user.id });

  res.status(200).json(children);
});

// @desc  Get child (single - must belong to current user)
// @ route GET /api/children/:id
// @ access Private

const getChild = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const child = await Child.findById(req.params.id);

  if (!child) {
    res.status(404);
    throw new Error("Child not found");
  }

  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(child);
});

// @desc  Create new child
// @ route POST /api/children
// @ access Private

const createChild = asyncHandler(async (req, res) => {
  const { firstname, dob, color, avatar } = req.body;
  if (!firstname || !dob || !color || !avatar) {
    res.status(400);
    throw new Error("Incomplete data supplied for new Child");
  }
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const child = await Child.create({
    firstname,
    dob,
    color,
    avatar,
    user: req.user.id,
  });

  res.status(201).json(child);
});

// @desc  Delete child
// @ route DELETE /api/children/:id
// @ access Private

const deleteChild = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const child = await Child.findById(req.params.id);

  if (!child) {
    res.status(404);
    throw new Error("Child not found");
  }

  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await child.remove();

  res.status(200).json({ success: true, _id: child._id });
});

// @desc  Update child (single - must belong to current user)
// @ route PUT /api/children/:id
// @ access Private

const updateChild = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const child = await Child.findById(req.params.id);

  if (!child) {
    res.status(404);
    throw new Error("Child not found");
  }

  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedChild = await Child.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedChild);
});

// imported in routes/childRoutes
module.exports = {
  getChildren,
  getChild,
  createChild,
  deleteChild,
  updateChild,
};
