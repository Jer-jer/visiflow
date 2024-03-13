const express = require("express");
const router = express.Router();
const passport = require("passport");
const VisitorController = require("../controllers/visitorController");
const multer = require('multer');

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

router.get("/", passport.authenticate("jwt", { session: false }), VisitorController.getVisitors);

router.post("/new", upload.fields([
    { name: 'visitor_data[id_picture][front]', maxCount: 1},
    { name: 'visitor_data[id_picture][back]', maxCount: 1},
    { name: 'visitor_data[id_picture][selfie]', maxCount: 1},
]), VisitorController.addVisitor);

router.post("/find", passport.authenticate("jwt", { session: false }), VisitorController.findVisitor);

router.post("/retrieve-image",passport.authenticate("jwt", { session: false }),  VisitorController.getVisitorImageById);

router.put("/update", passport.authenticate("jwt", { session: false }),  VisitorController.updateVisitor);

router.delete("/delete", passport.authenticate("jwt", { session: false }), VisitorController.deleteVisitor);

module.exports = router;
