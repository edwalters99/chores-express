const express = require("express");
const router = express.Router();
const {
  getChildren,
  getChild,
  createChild,
  deleteChild,
  updateChild,
} = require("../controllers/childController");
const { protect } = require("../middleware/authMiddleware");

// re-route to chore router
const choreRouter = require("./choreRoutes");
router.use("/:childId/chores", choreRouter);

router.route("/").get(protect, getChildren).post(protect, createChild);

router
  .route("/:id")
  .get(protect, getChild)
  .delete(protect, deleteChild)
  .put(protect, updateChild);

module.exports = router;
