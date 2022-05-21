const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getChilds).post(protect, createChild);


module.exports = router;