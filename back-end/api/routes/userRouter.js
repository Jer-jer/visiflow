const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const userController = require("../controllers/userController");

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

router.get("/", userController.getAllUsers);

router.post("/new", userController.createNewUser);

router.post("/search", userController.getUserById);

router.put("/update", userController.updateUser);

router.delete("/delete", userController.deleteUser);


module.exports = router;
