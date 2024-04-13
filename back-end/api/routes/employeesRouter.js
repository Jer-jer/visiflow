const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");


router.get("/", employeesController.getAllEmployees);
router.post("/new", employeesController.createNewEmployees);
router.post("/search", employeesController.getEmployeesByName);
router.put("/update", employeesController.updateEmployees);
router.delete("/delete", employeesController.deleteEmployees);
router.post("/notifyPOI", employeesController.notifyPOI);
module.exports = router;
