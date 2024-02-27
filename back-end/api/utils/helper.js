require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const RefreshToken = require('../models/refreshToken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = '20m';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRATION = "7d";

function hashPassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

function comparePassword(raw, hash) {
    return bcrypt.compareSync(raw, hash);
}

function generateAccessToken(user) {
    const jwtPayload = {
      sub: user._id,
      role: user.role
    };
    return jwt.sign(jwtPayload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION }); 
}

function generateRefreshToken(user) {
    const jwtPayload = {
        sub: user._id
    }
    return jwt.sign(jwtPayload, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRATION}) 
}

async function storeRefreshToken(token, userId) {
    const refreshToken = new RefreshToken({token, userId});
    await refreshToken.save();
}

async function verifyRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
        return decoded.sub;
    } catch (error) {
        return null;
    }
}

async function generateQRCode(badgeId) {
    return new Promise((resolve, reject) => {
        const filename = `api/resource/badge/badge${badgeId}.png`;
        //insert local machine ip here
        const uri = `http://192.168.43.94:5000/badge/checkBadge?qr_id=${badgeId}`;
        QRCode.toFile(filename, uri, { errorCorrectionLevel: 'H' }, function (err) {
            if (err) {
              console.error(`Error generating QR code for badge ${badgeId}: ${err.message}`);
              reject(err);
            } else {
              console.log(`QR code saved for badge ${badgeId}`);
              resolve();
            }
          });
    })
}

module.exports = { 
    hashPassword, 
    comparePassword, 
    generateAccessToken, 
    generateRefreshToken, 
    storeRefreshToken, 
    verifyRefreshToken,
    generateQRCode
};