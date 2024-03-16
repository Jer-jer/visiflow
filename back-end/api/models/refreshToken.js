const mongoose = require('mongoose');

const authConnection = mongoose.createConnection(`${process.env.MONGODB_AUTH}`);

const refreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now, expires: '7d' }
});

const RefreshToken = authConnection.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;