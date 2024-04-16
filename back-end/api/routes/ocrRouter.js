const express = require("express");
const router = express.Router();
const ocrController = require("../controllers/ocrController");

// router.use((req, res, next) => {
//   if (req.user && req.user.role.includes("admin")) next();
//   else res.send(401);
// });

router.post("/", ocrController.callMindeeApi);

module.exports = router;
