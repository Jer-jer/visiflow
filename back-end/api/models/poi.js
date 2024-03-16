const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const POISchema = new Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true, unique: true },
    position: { type: String, require: true },
    department: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const POIModel = mongoose.model('personOfInterest', POISchema);

module.exports = POIModel;