const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
    appointment_date: {
        type: Date,
        require: true
    },
    visitor_id: {
        type: Schema.Types.ObjectId,
        ref: 'visitor',
        required: true
    },
    purpose_id: {
        type: Schema.Types.ObjectId,
        ref: 'purpose',
        required: true,
    },
    POI_id: {
        type: Schema.Types.ObjectId,
        ref: 'personOfInterest',
        required: true
    },
    location_id: {
        type: Schema.Types.ObjectId,
        ref: 'buildingLocation',
        required: true
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

const AppointmentModel = mongoose.model('appointment', AppointmentSchema);

module.exports = AppointmentModel;