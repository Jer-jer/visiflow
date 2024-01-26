const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Name = new Schema({
    first_name: {type: String, require: true },
    middle_name: {type: String, require: true },
    last_name: {type: String, require: true }
});

const Address = new Schema({
    street: { type: String },
    house: { type: String },
    barangay: {type: String, require: true  },
    city: {type: String, require: true  },
    province: {type: String, require: true },
    country: { type: String }
});

const Photo = new Schema({
    name: { type: String },
    image: { type: String }
});

const IdPhoto = new Schema({
    front: Photo,
    back: Photo,
    selfie: Photo
}); 

const VisitorSchema = new Schema({
    name: Name,
    email: {type: String, require: true, unique: true },
    phone: {type: String, require: true },
    plate_num: {type: String, require: true },
    visitor_type: {
        type: String,
        enum: ['W', 'P'],
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
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const VisitorModel = mongoose.model('visitor', VisitorSchema);

module.exports = VisitorModel;
