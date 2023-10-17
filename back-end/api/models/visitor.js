const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const VisitorSchema = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    status: {
        type: String,
        enum: ['Approved', 'Pending', 'Declined'],
        default: 'Pending',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const VisitorModel = mongoose.model('visitor', VisitorSchema);

module.exports = VisitorModel;