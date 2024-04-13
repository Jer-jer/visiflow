const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BuildingLocSchema = new Schema({
    name: { type: String, require: true },
    roomNo:{ type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

BuildingLocSchema.index({ name: 1, roomNo: 1 }, { unique: true });

const BuildingLocModel = mongoose.model('buildingLocation', BuildingLocSchema);

module.exports = BuildingLocModel;