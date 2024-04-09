const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const employeesController = require("../controllers/employeesController");
=======
const announcementsController = require("../controllers/employeesController");
>>>>>>> master

// router.use((req, res, next) => {
//   if (req.user && req.user.role.includes("admin")) next();
//   else res.send(401);
// });
<<<<<<< HEAD
router.get("/", employeesController.getAllEmployees);
router.post("/new", employeesController.createNewEmployees);
router.post("/search", employeesController.getEmployeesByName);
router.put("/update", employeesController.updateEmployees);
router.delete("/delete", employeesController.deleteEmployees);
=======

router.get("/", announcementsController.getAllEmployees);

router.post("/new", announcementsController.createNewEmployees);

// router.post("/search", announcementsController.getEmployeesByName);

// router.put("/update", announcementsController.updateEmployees);

// router.delete("/delete", announcementsController.deleteEmployees);

>>>>>>> master
module.exports = router;
