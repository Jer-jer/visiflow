const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../models/user');

//Middlware to parse JSON request bodies
router.use(bodyParser.json());

const { body, validationResult } = require('express-validator');

// Middleware to validate the request body
const validateUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is required'),
];

//GET
//Route to get a list of all users
router.get('', async (req, res) => {
    try {
        const users = await User.find(); 
        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//POST
//Route to fetch a single user
router.post('/search', async (req, res) => {
    try {
        const {_id} = req.body;
        const searchedUser = await User.findById(_id);
        if(searchedUser) {
            res.status(201).json({ user: searchedUser });
        } else {
            res.status(404).json({ error: 'user not found'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//POST
//Route to create a new user
router.post('', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { username, email } = req.body;
        const newUser = new User({ username, email });
        const createdUser = await newUser.save();
        res.status(201).json({ user: createdUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//UPDATE
//Route to update an existing user by ID
router.post('/update', async (req, res) => {
    try {
        const { _id, username, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate( _id, { username, email }, { new: true });
        if(updatedUser) {
            res.json({ user: updatedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETE
//Delete a user by ID
router.post('/delete', async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedUser = await User.findByIdAndRemove(_id);
        if(deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }   
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

//username test only
// const usernames = await user.find({}, { username: 1, _id: 0 }); 
// const users = usernames.map(user => user.username);
// res.json({ users });

//hardcoded multiple fields test
// res.json({ "users": [
//     {"username" : "userOne", "email" : "userOne@mail"}, 
//     {"username" : "userTwo", "email": "userTwo@mail"}
// ] })