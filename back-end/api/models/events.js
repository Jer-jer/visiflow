const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EventsSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now },
    locationID: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const EventsModel = mongoose.model('event', EventsSchema);

module.exports = EventsModel;