const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const visitorController = require('../controllers/visitorController');

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get('/', visitorController.getAllVisitors);

router.post('/', visitorController.createNewVisitor);

router.post('/search', visitorController.getVisitorById);

router.post('/update', visitorController.updateVisitor);

router.post('/delete', visitorController.deleteVisitor);

module.exports = router;