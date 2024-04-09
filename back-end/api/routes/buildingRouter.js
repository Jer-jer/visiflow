const express = require("express");
const router = express.Router();
const passport = require('passport');
const BuildingLocController = require("../controllers/buildingController");

// router.use(
//     passport.authenticate('jwt', {session: false })
// );

router.get("/", BuildingLocController.getBuildings);

router.post("/new", BuildingLocController.addBuilding);

router.post("/find", BuildingLocController.findBuilding);

router.put("/update", BuildingLocController.updateBuilding);

router.delete("/delete", BuildingLocController.deleteBuilding);

module.exports = router;
