const mongoose = require("mongoose");

const authConnection = mongoose.createConnection(`${process.env.MONGODB_AUTH}`);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Name = new Schema({
  first_name: { type: String, require: true },
  middle_name: { type: String, require: true },
  last_name: { type: String, require: true },
});

const UserSchema = new Schema({
  _id: { type: ObjectId, require: false },
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
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const UserModel = authConnection.model("user", UserSchema);

module.exports = UserModel;
