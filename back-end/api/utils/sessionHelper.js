require('dotenv').config();

const session = require('express-session');
const crypto = require('crypto');
const MongoStore = require('connect-mongo');

// const sessionSecret = crypto.randomBytes(32).toString('hex');

const sessionMiddleware = session({
        secret: 'aksndlkajsdlkansld',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI,
        }),
});

module.exports = sessionMiddleware;