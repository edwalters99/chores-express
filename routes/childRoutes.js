const express = require('express');
const router = express.Router();
const { getChildren, createChild } = require('../controllers/childController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getChildren).post(protect, createChild);

module.exports = router;