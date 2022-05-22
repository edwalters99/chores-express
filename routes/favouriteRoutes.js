const express = require('express');
const router = express.Router();
const { getFavourites, createFavourite, updateFavourite, deleteFavourite } = require('../controllers/favouriteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getFavourites).post(protect, createFavourite);
router.route('/:id').put(protect, updateFavourite).delete(protect, deleteFavourite);

module.exports = router;