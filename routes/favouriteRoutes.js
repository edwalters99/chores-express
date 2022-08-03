const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getFavourites,
  createFavourite,
  deleteFavourite,
} = require('../controllers/favouriteController');

router.route('/').get(protect, getFavourites).post(protect, createFavourite);

router.route('/:id').delete(protect, deleteFavourite);

module.exports = router;
