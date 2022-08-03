const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/', registerUser); //api/users /
router.post('/login', loginUser); //api/users /login

module.exports = router;
