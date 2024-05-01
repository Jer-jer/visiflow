require('dotenv').config();

// Models
const RefreshToken = require("../models/refreshToken");

// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware
const { genSaltSync, hashSync, compareSync } = bcrypt;

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {string} The hashed password.
 */
function hashPassword(password) {
    const salt = genSaltSync();
    return hashSync(password, salt);
}
  
/**
 * Compares a raw password with a hashed password.
 * @param {string} raw - The raw password.
 * @param {string} hash - The hashed password.
 * @returns {boolean} True if the passwords match, false otherwise.
 */
function comparePassword(raw, hash) {
    return compareSync(raw, hash);
}

//End Section

//Token Utils Section

// Constants
const ACCESS_TOKEN_EXPIRATION = "15m";
const REFRESH_TOKEN_EXPIRATION = "7d";
// Environtment Variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

/**
 * Generate an access token for a user.
 * @param {object} user - The user object for which the access token is generated.
 * @param {string} user._id - The user's unique identifier.
 * @param {string} user.role - The role of the user.
 * @returns {string} The generated access token. 
 */
function generateAccessToken(user) {
    const jwtPayload = {
        sub: user._id,
        role: user.role,
    };
    return jwt.sign(jwtPayload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
}

/**
 * Generate a refresh token for a user
 * @param {object} user - The user object for which the refresh token is generated.
 * @param {string} user._id - The user's unique identifier. 
 * @returns {string} The generated refresh token.
 */
function generateRefreshToken(user) {
    const jwtPayload = {
        sub: user._id,
    };
    return jwt.sign(jwtPayload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
}

/**
 * Verifies the validity of an access token.
 * @param {string} token - The access token to verify. 
 * @returns {object|null} - The decoded token if valid, or null if the token is invalid or expired.
 */
function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}

/**
 * Verifies the validity of a refresh token.
 * @param {string} token - The refresh token to verify.
 * @returns {object|null} - The decoded token if valid, or null if the token is invalid or expired.
 */
async function verifyRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
        return decoded.sub;
    } catch (error) {
        return null;
    }
}

/**
 * Stores a refresh token in the database.
 * @param {string} token - The refresh token to strore. 
 * @param {string} userId - The ID of the user associated with the refresh token.
 * @returns {Promise<void>} A promise that resolves when the refresh token is successfully stored. 
 */
async function storeRefreshToken(token, userId) {
    const refreshToken = new RefreshToken({ token, userId });
    await refreshToken.save();
}

//End Section

module.exports = {
    hashPassword,
    comparePassword,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    storeRefreshToken
}