const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser
  // getCurrentUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// add protect as second argument when required

router.post("/", registerUser); //api/users /
router.post("/login", loginUser); //api/users /login
// router.post("/getcurrent", protect, getCurrentUser); //api/users /getcurrent    not yet used
module.exports = router;
