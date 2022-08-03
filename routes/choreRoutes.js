const express = require("express");
const router = express.Router({ mergeParams: true }); // to enable nested params
const { protect } = require("../middleware/authMiddleware");
const {
  getChores,
  getChoresActive,
  addChore,
  updateChore
  // getChoresApproval,
} = require("../controllers/choreController");

router.route("/").get(protect, getChores).post(protect, addChore);
router.route("/active").get(protect, getChoresActive);
router.route("/:id").put(protect, updateChore);

module.exports = router;
