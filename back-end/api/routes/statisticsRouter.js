const express = require("express");
const router = express.Router();
const StatsController = require("../controllers/statisticsController");
const passport = require("passport");

// router.use(passport.authenticate("jwt", { session: false }));

router.post("/", StatsController.totalVisitors);

router.post("/location", StatsController.mostVisited);

router.post("/graph", StatsController.graph);

router.get("/getYears", StatsController.getYears);

router.get("/getWeeks", StatsController.getWeeks);

router.post("/getDays", StatsController.getDays);

module.exports = router;
