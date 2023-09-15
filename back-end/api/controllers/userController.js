const User = require('../models/user');

const { body, validationResult } = require('express-validator');

// Middleware to validate the request body
const validateUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is required'),
];

//RESPONSE CODE LIST
//201 Request Successful
//500 Internal Server Error
//404 Request Not Found
//400 Failed Query

//Get list of all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error '});
    }
};

//Get user by ID
exports.getUserById = async (req, res) => {
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
};

//Create a new user
exports.createNewUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const { username, email } = req.body;
        const newUser = new User({ username, email });
        const createdUser = await newUser.save();
        if (createdUser) {
            res.status(201).json({ user: createdUser });
        } else {
            res.status(400).json({ error: 'Failed to Create new User' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

//Update a user by ID
exports.updateUser = async (req,res) => {
    try {
        const { _id, username, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate( _id, { username, email }, { new: true });
        if (updatedUser) {
            res.status(201).json({ user: updatedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }   
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedUser = await User.findByIdAndDelete(_id);
        if (deletedUser) {
            res.status(201).json({ message: 'User deleted sucessfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
