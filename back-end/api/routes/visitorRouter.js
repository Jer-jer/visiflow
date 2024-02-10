const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const visitorController = require('../controllers/visitorController');

router.get('/', visitorController.getAllVisitors);
=======
const bodyParser = require("body-parser");
const visitorController = require("../controllers/visitorController");

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get("/", visitorController.getAllVisitors);
>>>>>>> master

router.post('/new', visitorController.createNewVisitor);

router.post("/search", visitorController.getVisitorById);

<<<<<<< HEAD
router.put('/update', visitorController.updateVisitor);

router.delete('/delete', visitorController.deleteVisitor);
=======
router.put("/update", visitorController.updateVisitor);

router.delete("/delete", visitorController.deleteVisitor);
>>>>>>> master

module.exports = router;
