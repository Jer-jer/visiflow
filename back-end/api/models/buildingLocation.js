const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BuildingLocSchema = new Schema({
    name: { type: String, require: true },
    roomNo: { type: String  },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const BuildingLocModel = mongoose.model('buildingLocation', BuildingLocSchema);

module.exports = BuildingLocModel;