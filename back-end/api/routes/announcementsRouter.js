const express = require("express");
const router = express.Router();
const announcementsController = require("../controllers/announcementsController");

// router.use((req, res, next) => {
//   if (req.user && req.user.role.includes("admin")) next();
//   else res.send(401);
// });

router.get("/", announcementsController.getAllAnnouncements);

router.post("/new", announcementsController.createNewAnnouncements);

// router.post("/search", announcementsController.getAnnouncementsByID);

router.post("/update", announcementsController.updateAnnouncements);

// router.delete("/delete", announcementsController.deleteAnnouncements);

module.exports = router;
