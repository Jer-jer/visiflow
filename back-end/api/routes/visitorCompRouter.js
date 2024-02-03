const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const VisitorCompanionController = require('../controllers/visitorCompController');

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get("/", VisitorCompanionController.getAllCompanions);

router.post("/new", VisitorCompanionController.createNewCompanion);

router.post("/search", VisitorCompanionController.getCompanionById);

router.post("/update", VisitorCompanionController.updateCompanion);

router.post("/delete", VisitorCompanionController.deleteCompanion);

module.exports = router;
