const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PurposeSchema = new Schema({
    description: {type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const PurposeModel = mongoose.model('purpose', PurposeSchema);

module.exports = PurposeModel;