const User = require('../models/user');
const bcrypt = require('bcrypt');

const { body, validationResult } = require('express-validator');

// Middleware to validate the request body
const validateUser = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is required'),
];

//function to not return hashed password in json
function sanitizeUser(user) {
    return {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
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
        const { 
            first_name, 
            last_name, 
            username, 
            email, 
            password, 
            phone 
        } = req.body;
        
        //check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        //hashing the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ 
            first_name, 
            last_name, 
            username: username || (first_name + last_name).toLowerCase(),
            email, 
            password: hashedPassword, 
            phone: phone || "000-000-0000"
        });

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
        const { _id, first_name, last_name, username, email, phone } = req.body;
        const updatedUser = await User.findByIdAndUpdate( _id, { first_name, last_name, username, email, phone }, { new: true });
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
