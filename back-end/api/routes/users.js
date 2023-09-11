const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('', async (req, res) => {
    try {

        //username test only
        // const usernames = await user.find({}, { username: 1, _id: 0 }); 
        // const users = usernames.map(user => user.username);
        // res.json({ users });

        //hardcoded multiple fields test
        // res.json({ "users": [
        //     {"username" : "userOne", "email" : "userOne@mail"}, 
        //     {"username" : "userTwo", "email": "userTwo@mail"}
        // ] })

        const users = await user.find();
        res.json({users});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
