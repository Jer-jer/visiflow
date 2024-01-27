const mongoose = require('mongoose');

const logsConnection = mongoose.createConnection(`${process.env.MONGODB_URI}/logs`);

const Schema = mongoose.Schema;

const VisitorLogSchema = new Schema({
    log_id: { type: String, require: true, unique: true },
    location_id: { type: String, require: true, unique: true },
    check_in_time: { type: Date, require: true },
    check_out_time: { type: Date, require: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = logsConnection.model('visitor_log', VisitorLogSchema);