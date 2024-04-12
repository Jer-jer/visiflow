const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ReasonSchema = new Schema({
    reason: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const ReasonModel = mongoose.model('reasons', ReasonSchema);

module.exports = ReasonModel;