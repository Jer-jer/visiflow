const express = require("express");
const router = express.Router();
const VisitorCompanionController = require('../controllers/visitorCompController');

router.get("/", VisitorCompanionController.getAllCompanions);

router.post("/new", VisitorCompanionController.createNewCompanion);

router.post("/search", VisitorCompanionController.getCompanionById);

router.post("/update", VisitorCompanionController.updateCompanion);

router.post("/delete", VisitorCompanionController.deleteCompanion);

module.exports = router;
