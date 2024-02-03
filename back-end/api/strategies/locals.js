const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../models/user');
const { comparePassword } = require('../utils/helper');

passport.serializeUser((user, done) => {
    console.log('Serializing user...');
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Desirializing user...');
    console.log(id);
    try {
        const userDB = await User.findById(id);
        if(!userDB) throw new Error('User not found');
        done(null, userDB);
    } catch (error) {
        console.log(error);
        done(error, null);
    }
});

passport.use(
    new Strategy( async (username, password, done) => {
            try {
                if(!username || !password) throw new Error('Missing Credentials');
                const userDB = await User.findOne({username});
                if(userDB) {
                    console.log(userDB);
                    const isValid = comparePassword(password, userDB.password);
                    if(isValid) {
                      console.log('User Authenticated');
                      done(null, userDB);  
                    } else {
                        console.log('Failed to Authenticate');
                        done(null, null);
                    }
                } else {
                    done(null, null);
                }
            } catch (error) {
                done(error, null);
            }
        }
    )
);