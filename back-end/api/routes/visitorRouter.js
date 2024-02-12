const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorController");

router.get("/", visitorController.getAllVisitors);

router.post("/new", visitorController.createNewVisitor);

router.post("/search", visitorController.getVisitorById);

router.put("/update", visitorController.updateVisitor);

router.delete("/delete", visitorController.deleteVisitor);

module.exports = router;
