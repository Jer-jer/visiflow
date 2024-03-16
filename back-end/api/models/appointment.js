const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
    appointment_date: { type: Date, require: true },
    visitor_id: { type: Schema.Types.ObjectId, ref: 'visitor', require: true },
    purpose_id: { type: Schema.Types.ObjectId, ref: 'purpose', require: true },
    POI_id: { type: Schema.Types.ObjectId, ref: 'personOfInterest', require: true },
    location_id: { type: Schema.Types.ObjectId, ref: 'buildingLocation', require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const AppointmentModel = mongoose.model('appointment', AppointmentSchema);

module.exports = AppointmentModel;