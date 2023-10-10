const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Name = new Schema({
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    }
});

const Address = new Schema({
    street: String,
    house: String,
    barangay: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    country: String
});

const Photo = new Schema({
    name: String,
    image: String,
})

const IdPhoto = new Schema({
    type: String,
    front: Photo,
    back: Photo,
    selfie: Photo
})

const VisitorSchema = new Schema({
    visitor_id: {
        type: String,
        require: true,
        unique: true
    },
    name: Name,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    plate_num: String,
    visitor_type: {
        type: String,
        enum: ['W', 'Pr'],
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'declined'],
        default: 'pending',
        required: true
    },
    address: Address,
    id_picture: IdPhoto,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('visitor', VisitorSchema);