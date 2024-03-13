const mongoose = require('mongoose');

const logsConnection = mongoose.createConnection(`${process.env.MONGODB_LOGS}`);

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const badgeSchema = new Schema({
    visitor_id: { type: ObjectId, ref: 'visitor', require: true },
    qr_id: { type: Number},
    is_active: { type: Boolean, require: true, default: true},
    is_valid: { type: Boolean, requrie: true, default: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const badgeModel = logsConnection.model('badge', badgeSchema);

module.exports = badgeModel;