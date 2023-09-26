const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('../controllers/authController');

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;