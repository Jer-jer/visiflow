require('dotenv').config();

const User = require('../models/user');
const { 
    generateAccessToken, 
    generateRefreshToken, 
    storeRefreshToken, 
    verifyRefreshToken 
} = require('../utils/helper');

exports.login = async (req, res) => {
    const access_token = generateAccessToken(req.user);
    const refresh_token = generateRefreshToken(req.user);
    await storeRefreshToken(refresh_token, req.user._id);
    return res.json({ access_token: access_token, refresh_token: refresh_token });
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if(!refreshToken) return res.status(401).json({ message: 'Refresh token is required' });
    
    const userId = await verifyRefreshToken(req.body.refreshToken);
    if(!userId) return res.status(403).json({ message: 'Invalid refresh token' });

    const user = await User.findById(userId);
    const access_token = generateAccessToken(user);
    return res.status(200).json({ access_token });
}