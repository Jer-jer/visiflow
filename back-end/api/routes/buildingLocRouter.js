const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const buildingLocController = require('../controllers/buildingLocController');

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get('/', buildingLocController.getAllBldgLoc);

router.post("/new", buildingLocController.createNewBldgLoc);

router.post('/search', buildingLocController.getBldgLocByID);

router.post('/update', buildingLocController.updateBldgLoc);

router.post('/delete', buildingLocController.deleteBldgLoc);

module.exports = router;