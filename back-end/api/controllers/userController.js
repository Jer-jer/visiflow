const User = require('../models/user');
const bcrypt = require('bcrypt');

const { body, validationResult } = require('express-validator');

// Middleware to validate the request body
const validateUser = [
    body('name').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is required'),
];

//function to not return hashed password in json
function sanitizeUser(user) {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

//RESPONSE CODE LIST
//201 Request Successful
//500 Internal Server Error
//404 Request Not Found
//400 Failed Query

//Get list of all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        return res.json({ users });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error '});
    }
};

//Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const {_id} = req.body;
        const searchedUser = await User.findById(_id, '-password');
        
        if(searchedUser) {
            return res.status(201).json({ user: searchedUser });
        } else {
            return res.status(404).json({ error: 'user not found'});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Create a new user
exports.createNewUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password } = req.body;
        
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        //hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = new User({ name, email, password: hashedPassword });

        const createdUser = await newUser.save();
        if (createdUser) {
            return res.status(201).json({ user: sanitizeUser(createdUser) });
        } else {
            return res.status(400).json({ error: 'Failed to Create new User' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

//Update a user by ID
exports.updateUser = async (req,res) => {
    try {
        const { _id, name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate( _id, { name, email }, { new: true });
        if (updatedUser) {
            return res.status(201).json({ user: sanitizeUser(updatedUser) });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }   
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedUser = await User.findByIdAndDelete(_id);
        if (deletedUser) {
            return res.status(201).json({ message: 'User deleted sucessfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
