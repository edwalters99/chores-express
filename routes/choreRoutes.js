const express = require("express");
const router = express.Router({ mergeParams: true }); // to enable nested params
const {
  getChores,
  getChoresActive,
  addChore,
  updateChore
  // getChoresApproval,
} = require("../controllers/choreController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getChores).post(protect, addChore);
router.route("/active").get(protect, getChoresActive);
// router.route("/approval").get(protect, getChoresApproval); *** not yet implemented ***
router.route("/:id").put(protect, updateChore);

module.exports = router;
