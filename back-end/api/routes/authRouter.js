const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.post('/login', passport.authenticate('local', {session: false}), authController.login);

router.post('/refreshToken', authController.refreshToken);

module.exports = router;