const mongoose = require('mongoose');

const authConnection = mongoose.createConnection(`${process.env.MONGODB_URI}/auth`);

const Schema = mongoose.Schema;

const Name = new Schema({
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    }
});

const UserSchema = new Schema({
    name: Name,
    
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'security'],
        default: 'security',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
