const express = require("express");
const router = express.Router();
const officesController = require("../controllers/officesController");

// router.use((req, res, next) => {
//   if (req.user && req.user.role.includes("admin")) next();
//   else res.send(401);
// });

router.get("/", officesController.getAllOffices);

router.post("/new", officesController.addOffices);

router.post("/search", officesController.getOffices);

router.put("/update", officesController.updateOffices);

router.delete("/delete", officesController.deleteOffices);

module.exports = router;
