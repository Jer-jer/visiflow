const express = require("express");
const router = express.Router();
const announcementsController = require("../controllers/employeesController");

// router.use((req, res, next) => {
//   if (req.user && req.user.role.includes("admin")) next();
//   else res.send(401);
// });

router.get("/", announcementsController.getAllEmployees);

router.post("/new", announcementsController.createNewEmployees);

// router.post("/search", announcementsController.getEmployeesByName);

// router.put("/update", announcementsController.updateEmployees);

// router.delete("/delete", announcementsController.deleteEmployees);

module.exports = router;
