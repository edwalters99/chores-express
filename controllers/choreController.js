const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Child = require('../models/childModel');
const Chore = require('../models/choreModel');

// @desc  Get chores for a child
// @ route GET /api/children/:childId/chores
// @ access Private

const getChores = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  let child;
  try {
    child = await Child.findById(req.params.childId);
  } catch (error) {
    res.status(400);
    throw new Error('Bad request');
  }

  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const chores = await Chore.find({ child: req.params.childId });

  res.status(200).json(chores);
});

// @desc  Get chores for a child - ACTIVE CHORES ONLY - (NOT COMPLETED CHORES)
// @ route GET /api/children/:childId/chores/active
// @ access Private

const getChoresActive = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  let child;
  try {
    child = await Child.findById(req.params.childId);
  } catch (error) {
    res.status(400);
    throw new Error('Bad request');
  }

  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const choresActive = await Chore.find({
    child: req.params.childId,
    isCompleted: false,
  });

  res.status(200).json(choresActive);
});

// @desc  Get chores for a child - AWAITING APPROVAL - (COMPLETED but NOT APPROVED)
// @ route GET /api/children/:childId/chores/approval
// @ access Private

// const getChoresApproval = asyncHandler(async (req, res) => {
//   // Get user using the id in the JWT
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(401);
//     throw new Error("User not found");
//   }

//   const child = await Child.findById(req.params.childId);

//   if (child.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("User not authorized");
//   }

//   const choresApproval = await Chore.find({
//     child: req.params.childId,
//     isCompleted: true,
//     isApproved: false,
//   });

//   res.status(200).json(choresApproval);
// });

// @desc  Create child chore
// @ route POST /api/children/:childId/chores
// @ access Private

const addChore = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  let child;
  try {
    child = await Child.findById(req.params.childId);
  } catch (error) {
    res.status(400);
    throw new Error('Bad request');
  }

  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const chore = await Chore.create({
    title: req.body.title,
    desc: req.body.desc,
    value: req.body.value,
    icon: req.body.icon,
    child: req.params.childId,
    user: req.user.id,
  });

  res.status(200).json(chore);
});

// @desc  Update child chore
// @ route PUT /api/children/:childId/chores/:id
// @ access Private

const updateChore = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  let child;
  try {
    child = await Child.findById(req.params.childId);
  } catch (error) {
    res.status(400);
    throw new Error('Bad request');
  }

  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedChore = await Chore.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedChore);
});

module.exports = {
  getChores,
  getChoresActive,
  // getChoresApproval,
  addChore,
  updateChore,
};
