require('dotenv').config();

const session = require('express-session');
const crypto = require('crypto');
const MongoStore = require('connect-mongo');

// const sessionSecret = crypto.randomBytes(32).toString('hex');

const sessionMiddleware = session({
<<<<<<< HEAD
        secret: '292e7192c6b4d32343d726c51f2ccab51fadcbdf91f48695d24d23d307e25c70',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI + '/auth',
=======
        secret: 'aksndlkajsdlkansld',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI,
>>>>>>> master
        }),
});

module.exports = sessionMiddleware;