const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

router.get('/', visitorController.getAllVisitors);

router.post('/new', visitorController.createNewVisitor);

router.post('/search', visitorController.getVisitorById);

router.post('/update', visitorController.updateVisitor);

router.post('/delete', visitorController.deleteVisitor);

module.exports = router;
