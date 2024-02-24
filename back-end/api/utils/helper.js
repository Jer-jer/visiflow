require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION; 

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

module.exports = { hashPassword, comparePassword, generateAccessToken, generateRefreshToken, storeRefreshToken, verifyRefreshToken};