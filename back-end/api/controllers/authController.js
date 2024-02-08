require('dotenv').config();

const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/helper');
const { filterUserData } = require('../middleware/filterData');

exports.login = async (req, res) => {
    console.log('logged-in');
    res.send(200);
};

exports.logout = async (req, res, next) => {
    if(!req.user) {
        res.status(400).json({msg: 'Not logged-in'});
    } else {
        req.logout( () => {
            res.status(201).json({msg: 'Successfully logged-out'});
        });
    }
}

exports.register = async (req, res) => {
    const { first_name, middle_name, last_name, username, email, password, phone, role } = req.body;
    const userDB = await User.findOne({email});
    if(userDB) {
        res.status(400).send({msg: 'User already exists'});
    } else {
        const hashedPassword = hashPassword(password);
        const newUser = await User.create({
            name: {
                first_name,
                middle_name,
                last_name
            },
            username: username || (first_name + last_name).toLowerCase(),
            email,
            password: hashedPassword,
            phone,
            role
        });
        res.status(201).json({newUser: filterUserData(newUser)});
    }
};


