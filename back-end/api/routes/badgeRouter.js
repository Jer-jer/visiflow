const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');

router.get('/generateBadge', badgeController.generateBadge);

router.get('/checkBadge', badgeController.checkBadge);

router.post('/newBadge', badgeController.newBadge);

module.exports = router;