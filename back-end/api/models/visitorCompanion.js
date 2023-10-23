const mongoose = require('mongoose');

const processConnection = mongoose.createConnection(`${process.env.MONGODB_URI}/process`);

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

const VisitorCompanionSchema = new Schema({
    companion_id: {
        type: String,
        require: true,
        unique: true
    },
    visitor_id: {
        type: String,
        require: true,
    },
    name: Name,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
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

module.exports = processConnection.model('visitor_companion', VisitorCompanionSchema);