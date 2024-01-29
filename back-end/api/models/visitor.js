const mongoose = require("mongoose");

const processConnection = mongoose.createConnection(
  `${process.env.MONGODB_URI}/process`
);

const Schema = mongoose.Schema;

const Name = new Schema({
  first_name: {
    type: String,
    require: true,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    require: true,
  },
});

const Address = new Schema({
  street: String,
  house_no: String,
  brgy: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: String,
});

const Photo = new Schema({
  name: String,
  image: String,
});

const IdPhoto = new Schema({
  type: String,
  front: Photo,
  back: Photo,
  selfie: Photo,
});

const VisitorDetails = new Schema({
  visitor_id: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: Name,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  house_no: String,
  street: String,
  brgy: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  time_in: {
    type: String,
    required: true,
  },
  time_out: {
    type: String,
    required: true,
  },
});

const VisitorSchema = new Schema({
  visitor_details: {
    type: VisitorDetails,
    required: true,
  },
  plate_num: String,
  status: {
    type: String,
    enum: ["Approved", "In Progress", "Declined"],
    default: "In Progress",
    required: true,
  },
  visitor_type: {
    type: String,
    enum: ["Walk-In", "Pre-Registered"],
    required: true,
  },
  // id_picture: IdPhoto,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const VisitorModel = processConnection.model("visitor", VisitorSchema);

module.exports = VisitorModel;
