const mongoose = require("mongoose");

const logsConnection = mongoose.createConnection(`${process.env.MONGODB_LOGS}`);

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const VisitorLogSchema = new Schema({
  log_id: { type: ObjectId, require: true },
  badge_id: { type: ObjectId, ref: "badge", require: true },
  check_in_time: { type: Date, require: true },
  check_out_time: { type: Date, require: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = logsConnection.model("visitor_log", VisitorLogSchema);
