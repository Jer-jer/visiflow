const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/statisticsController');

router.post('/', StatsController.totalVisitors);

router.post('/location', StatsController.mostVisited);

router.post('/graph', StatsController.graph);

router.get('/getYears', StatsController.getYears);

router.get('/getWeeks', StatsController.getWeeks);

module.exports = router;