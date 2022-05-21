const express = require('express');
const router = express.Router();
const { getChilds, createChild } = require('../controllers/childController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getChilds).post(protect, createChild);

module.exports = router;