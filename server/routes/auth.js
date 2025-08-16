
const express = require('express');
const router = express.Router();
const { registerUser, loginUser,getMe } = require('../controllers/authController');

router.post('/register', registerUser);


router.post('/login', loginUser);

router.get('/me', getMe);

module.exports = router;
