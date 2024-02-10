const mongoose = require("mongoose");

//! DO NOT REMOVE!! REQUIRED TO CREATE A SEPARATE COLLECTION
const processConnection = mongoose.createConnection(
  `${process.env.MONGODB_URI}/process`
);

const Schema = mongoose.Schema;

const Name = new Schema({
  first_name: { type: String, require: true },
  middle_name: { type: String, require: true },
  last_name: { type: String, require: true },
});

const Address = new Schema({
  street: { type: String },
  house: { type: String },
  brgy: { type: String, require: true },
  city: { type: String, require: true },
  province: { type: String, require: true },
  country: { type: String },
});

const Photo = new Schema({
  name: { type: String },
  image: { type: String },
});

const IdPhoto = new Schema({
  front: Photo,
  back: Photo,
  selfie: Photo,
});

const VisitorDetails = new Schema({
  name: { type: Name, required: true },
  address: { type: Address, required: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  time_in: { type: String, require: true, default: "" },
  time_out: { type: String, require: true, default: "" },
});

const Purpose = new Schema({
  what: [
    {
      type: String,
      required: true,
    },
  ],
  when: {
    type: String,
    required: true,
  },
  where: [
    {
      type: String,
      required: true,
    },
  ],
  who: [
    {
      type: String,
      required: true,
    },
  ],
});

const VisitorSchema = new Schema({
  visitor_details: {
    type: VisitorDetails,
    required: true,
  },
  companion_details: [
    {
      type: VisitorDetails,
      required: true,
    },
  ],
  plate_num: String,
  purpose: {
    type: Purpose,
    required: true,
  },
  visitor_type: {
    type: String,
    enum: ["Walk-In", "Pre-Registered"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Approved", "In Progress", "Declined"],
    default: "In Progress",
    required: true,
  },
  //   id_picture: IdPhoto, //? Will uncomment later
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

//! DO NOT REMOVE OR UPDATE!! REQUIRED TO CREATE A SEPARATE COLLECTION
const VisitorModel = processConnection.model("visitor", VisitorSchema);

module.exports = VisitorModel;
