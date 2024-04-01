require('dotenv').config();

const User = require('../models/user');
const { 
    generateAccessToken, 
    generateRefreshToken, 
    storeRefreshToken, 
    verifyRefreshToken,
    createSystemLog,
} = require('../utils/helper');

exports.login = async (req, res) => {
    const user_id = req.user._id;
    const log_type = 'log_in';

    try {
        const access_token = generateAccessToken(req.user);
        const refresh_token = generateRefreshToken(req.user);
        
        await storeRefreshToken(refresh_token, req.user._id);
        await createSystemLog(user_id, log_type, 'success');
        return res.json({ access_token: access_token, refresh_token: refresh_token });
    } catch (error) {
        console.error(error);
        await createSystemLog(user_id, log_type, 'failed');
        return res.status(500).json({ Error: error });
    }
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