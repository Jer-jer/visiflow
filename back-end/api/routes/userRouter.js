const express = require("express");
const router = express.Router();
const passport = require('passport');
const UserController = require("../controllers/userController");

// router.use(
//     passport.authenticate('jwt', {session: false})
// );

router.get("/", UserController.getUsers);

router.post("/new", UserController.addUser);

router.post("/find", UserController.findUser);

router.put("/update", UserController.updateUser);

router.delete("/delete", UserController.deleteUser);

module.exports = router;
