const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

// router.use((req, res, next) => {
//   if (req.user && req.user.role.includes("admin")) next();
//   else res.send(401);
// });
router.get("/", employeesController.getAllEmployees);
router.post("/new", employeesController.createNewEmployees);
router.post("/search", employeesController.getEmployeesByName);
router.put("/update", employeesController.updateEmployees);
router.delete("/delete", employeesController.deleteEmployees);
module.exports = router;
