const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/authController');

router.post('/login', passport.authenticate('local', {session: false}), AuthController.login);

router.post('/refreshToken', AuthController.refreshToken);

module.exports = router;