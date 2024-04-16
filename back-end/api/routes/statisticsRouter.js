const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/statisticsController');

router.post('/', StatsController.totalVisitors);

router.post('/location', StatsController.mostVisited);

module.exports = router;