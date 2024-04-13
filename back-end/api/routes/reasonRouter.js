const express = require("express");
const router = express.Router();
const reasonsController = require("../controllers/reasonsController");

// router.use((req, res, next) => {
//   if (req.user && req.user.role.includes("admin")) next();
//   else res.send(401);
// });

router.get("/", reasonsController.getAllReasons);

router.post("/new", reasonsController.createNewReasons);

router.post("/search", reasonsController.getReasonsByTitle);

router.put("/update", reasonsController.updateReasons);

router.delete("/delete", reasonsController.deleteReasons);

module.exports = router;
