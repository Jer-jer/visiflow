const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const visitorController = require('../controllers/visitorController')

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get("/all", visitorController.getVisitors);

router.get("/search", async (req, res) => {
  res.send(req.query);
});

router.get("/:id", visitorController.searchVisitor);

router.post("/new", visitorController.addVisitor);

router.put("/update/:id", visitorController.updateVisitor);

router.delete("/delete/:id", visitorController.deleteVisitor);

module.exports = router;
