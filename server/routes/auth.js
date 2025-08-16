
const express = require('express');
const router = express.Router();
const authMiddleware=require('../middlewares/authMiddleware');
const { registerUser, loginUser,deleteUser } = require('../controllers/authController');

router.post('/register', registerUser);


router.post('/login', loginUser);

router.delete('/delete', authMiddleware, deleteUser);


module.exports = router;
