const express = require('express');
const router = express.Router();
const user = require('../models/user');

//Routes
/**
 * GET /
 * HOME
 */
router.get('', async (req, res) => {
    try {
        const data = await user.find();
        res.render('index', {data});
    } catch (error) {
        console.log(error);
    }    
});

// function insertUser() {
//     user.insertMany([
//         {   
//             username: "user_01",
//             email: "user01@mail.com"
//         },
//         {   
//             username: "user_02",
//             email: "user02@mail.com"
//         }
//     ])
// }

// insertUser();

module.exports = router;