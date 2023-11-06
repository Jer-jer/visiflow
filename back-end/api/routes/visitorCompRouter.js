const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const VisitorCompanionController = require('../controllers/visitorCompController');

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get("/all", VisitorCompanionController.getCompanions);

router.get("/:id", VisitorCompanionController.searchCompanion);

router.post("/new", VisitorCompanionController.addCompanion);

router.put("/update/:id", VisitorCompanionController.updateCompanion);

router.delete("/delete/:id", VisitorCompanionController.deleteCompanion);

module.exports = router;
