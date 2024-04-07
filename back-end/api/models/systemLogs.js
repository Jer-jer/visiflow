const mongoose = require("mongoose");

const logsConnection = mongoose.createConnection(`${process.env.MONGODB_LOGS}`);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Name = new Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
});

const systemLogSchema = new Schema({
  user_id: { type: ObjectId, require: true },
  name: { type: Name, require: true },
  role: { type: String, require: true },
  type: {
    type: String,
    enum: [
      "time_in",
      "time_out",
      "add_visitor",
      "update_visitor",
      "delete_visitor",
      "approve_status",
      "decline_status",
      "add_user",
      "update_user",
      "delete_user",
      "log_in",
      "log_out",
      "generate_badge",
    ],
    require: true,
  },
  status: {
    type: String,
    enum: ["success", "failed"],
  },
  created_at: { type: Date, default: Date.now },
});

const systemLogModel = logsConnection.model("systemLog", systemLogSchema);

module.exports = systemLogModel;
