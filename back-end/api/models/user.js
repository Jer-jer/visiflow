const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Name = new Schema({
    first_name: {type: String, require: true },
    middle_name: {type: String, require: true },
    last_name: {type: String, require: true }
});

const UserSchema = new Schema({
    name: Name,
    username: {type: String, require: true },
    email: {type: String, require: true, unique: true },
    password: {type: String, require: true },
    phone: {type: String, require: true },
    role: {type: String, 
        enum: ['admin', 'security'],
        default: 'security',
        require: true },
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now }
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;

