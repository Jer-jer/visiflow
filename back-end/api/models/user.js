const mongoose = require("mongoose");

//! DO NOT REMOVE!! REQUIRED TO CREATE A SEPARATE COLLECTION
const authConnection = mongoose.createConnection(`${process.env.MONGODB_AUTH}`);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Name = new Schema({
  first_name: { type: String, require: true },
  middle_name: { type: String, require: true },
  last_name: { type: String, require: true },
});

const UserSchema = new Schema({
  _id: { type: ObjectId },
  name: Name,
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  phone: { type: String, require: true },
  role: {
    type: String,
    enum: ["admin", "security"],
    default: "security",
    require: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//! DO NOT REMOVE OR UPDATE!! REQUIRED TO CREATE A SEPARATE COLLECTION
const UserModel = authConnection.model("user", UserSchema);

module.exports = UserModel;
