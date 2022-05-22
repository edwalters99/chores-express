const express = require('express');
const router = express.Router();
const { getFavourites, createFavourite } = require('../controllers/favouriteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getFavourites).post(protect, createFavourite);

module.exports = router;