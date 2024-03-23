const express = require('express');
const router = express.Router();
const passport = require('passport');
const NotificationController = require('../controllers/notificationController');

router.use(
    passport.authenticate('jwt', {session: false})
);

router.get('/', NotificationController.getNotifications);

router.put('/update', NotificationController.updateNotification);

module.exports = router;