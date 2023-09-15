const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get('/', userController.getAllUsers);

router.post('/', userController.createNewUser);

router.post('/search', userController.getUserById);

router.post('/update', userController.updateUser);

router.post('/delete', userController.deleteUser);

module.exports = router;