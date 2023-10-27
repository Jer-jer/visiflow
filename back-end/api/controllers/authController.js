require('dotenv').config();

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

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

exports.register = async (req, res) => {
    try {
        const { 
            first_name, 
            last_name,
            username,
            email, 
            password,
            phone
        } = req.body;
        // Check if the user already exists

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({ 
            first_name, 
            last_name, 
            username: username || (first_name + last_name).toLowerCase(), 
            email, 
            password: hashedPassword, 
            phone: phone || "000-000-0000" });
        const savedUser = await newUser.save();

        if (savedUser) {
            // Create JWT token
            const token = jwt.sign({ _id: savedUser._id }, secretKey, {
                expiresIn: '1h',
            });
            return res.status(201).json({ user: sanitizeUser(savedUser), token });
        } else {
            return res.status(400).json({ error: 'Failed to create a new user' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        //verify password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        //create JWT token
        const token = jwt.sign({ _id: user._id }, secretKey, {
            expiresIn: '1h',
        });
        
        return res.status(200).json({ user: sanitizeUser(user), token });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};