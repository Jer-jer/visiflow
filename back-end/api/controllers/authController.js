//DONE CHECKING
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const token = generateToken(req.user);
    res.json({ token: token });
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

exports.test = (req, res) => {
    res.json(req.user);
}

function generateToken(user) {
    const jwtPayload = {
      sub: user._id,
      role: user.role
    };
    return jwt.sign(jwtPayload, 'visiflow', { expiresIn: '1h' }); 
}