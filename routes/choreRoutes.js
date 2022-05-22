const express = require('express');
const router = express.Router({ mergeParams: true }); // to enable nested params
const { getChores, addChore } = require('../controllers/choreController')
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getChores).post(protect, addChore);

module.exports = router;