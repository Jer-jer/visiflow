const express = require('express');
const router = express.Router();
const buildingLocController = require('../controllers/buildingLocController');

router.get('/', buildingLocController.getAllBldgLoc);

router.post("/new", buildingLocController.createNewBldgLoc);

router.post('/search', buildingLocController.getBldgLocByID);

router.post('/update', buildingLocController.updateBldgLoc);

router.post('/delete', buildingLocController.deleteBldgLoc);

module.exports = router;