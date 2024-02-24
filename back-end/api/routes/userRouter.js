//DONE CHECKING
const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

// router.use((req, res, next) => {
//    if (req.user && req.user.role.includes("admin")) next();
//    else res.sendStatus(401);
// });

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", userController.getAllUsers);

router.post("/new", userController.createNewUser);

router.post("/search", userController.getUserById);

router.put("/update", userController.updateUser);

router.delete("/delete", userController.deleteUser);

module.exports = router;
