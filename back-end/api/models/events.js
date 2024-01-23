const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EventsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: Date,
        default: Date.now
    },
    locationId: {
        type: String,
        required: false
    },
    userId: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const EventsModel = mongoose.model('events', EventsSchema);

module.exports = EventsModel;