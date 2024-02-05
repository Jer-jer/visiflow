const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EventsSchema = new Schema({
    name: { type: String, require: true },
    date: { type: Date, default: Date.now },
    enddate: { type: Date, default: Date.now },
    locationId: { type: String },
    userId: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const EventsModel = mongoose.model('events', EventsSchema);

module.exports = EventsModel;