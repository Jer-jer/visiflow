const express = require('express');
const router = express.Router();
const passport = require('passport');
const SystemLogController = require('../controllers/systemLogController');

router.use(
    passport.authenticate('jwt', {session: false})
);

router.post('/new', SystemLogController.addLog);

module.exports = router;

