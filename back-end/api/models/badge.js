const mongoose = require('mongoose');

const logsConnection = mongoose.createConnection(`${process.env.MONGODB_LOGS}`);

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Purpose = new Schema({
  what: [{ type: String, required: true }],
  when: { type: Date, required: true },
  where: [{ type: String, required: true }],
  who: [{ type: String, required: true }],
});

const badgeSchema = new Schema({
    visitor_id: { type: ObjectId, ref: 'visitor', require: true },
    qr_id: { type: ObjectId },
    is_active: { type: Boolean, require: true, default: true},
    is_valid: { type: Boolean, requrie: true, default: true},
    purpose: { type: Purpose, required: true },
    expected_time_in: { type: Date, sparse: true },
    expected_time_out: { type: Date, sparse: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const badgeModel = logsConnection.model('badge', badgeSchema);

module.exports = badgeModel;