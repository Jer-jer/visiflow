const express = require('express');
const router = express.Router();
const buildingLocController = require('../controllers/buildingLocController');

<<<<<<< HEAD
router.use((req, res, next) => {
    if(req.user && req.user.role.includes('admin')) next();
    else res.send(401);
});

router.get('/', buildingLocController.getAllBldgLoc);

router.post('/new', buildingLocController.createNewBldgLoc);
=======
router.get('/', buildingLocController.getAllBldgLoc);

router.post("/new", buildingLocController.createNewBldgLoc);
>>>>>>> master

router.post('/search', buildingLocController.getBldgLocByID);

router.put('/update', buildingLocController.updateBldgLoc);

router.delete('/delete', buildingLocController.deleteBldgLoc);

module.exports = router;