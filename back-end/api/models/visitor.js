const mongoose = require("mongoose");

const processConnection = mongoose.createConnection(
  `${process.env.MONGODB_PROCESS}`
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

const IdPhoto = new Schema({
  front: { type: String, require: true },
  back: { type: String, require: true },
  selfie: { type: String, require: true },
});

const VisitorDetails = new Schema({
  name: { type: Name, required: true },
  address: { type: Address, required: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
});

const Purpose = new Schema({
  what: [{ type: String, required: true }],
  when: { type: Date, required: true },
  where: [{ type: String, required: true }],
  who: [{ type: String, required: true }],
});

const VisitorSchema = new Schema({
  visitor_details: { type: VisitorDetails, required: true },
  companion_details: [{ type: VisitorDetails, required: true, default: [] }],
  plate_num: { type: String, sparse: true },
  purpose: { type: Purpose, required: true },
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
  id_picture: { type: IdPhoto, required: true },
  expected_time_in: { type: Date, sparse: true },
  expected_time_out: { type: Date, sparse: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

VisitorSchema.index({ "visitor_details.email": 1, "visitor_details.phone": 1 });

VisitorSchema.index({
  "visitor_details.name.first_name": 1,
  "visitor_details.name.middle_name": 1,
  "visitor_details.name.last_name": 1,
});

VisitorSchema.index({ status: 1 });

const VisitorModel = processConnection.model("visitor", VisitorSchema);

module.exports = VisitorModel;
