const mongoose = require("mongoose");

const processConnection = mongoose.createConnection(
  `${process.env.MONGODB_PROCESS}`
);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Content = new Schema({
  visitor_name: { type: String, require: true },
  host_name: { type: String, require: true },
  date: { type: Date, require: true },
  time_in: { type: Date, require: true },
  time_out: { type: Date, require: true },
  location: { type: String, require: true },
  purpose: { type: String, require: true },
  visitor_type: { type: String, require: true },
});

const NotificationSchema = new Schema({
  _id: { type: ObjectId, require: false },
  type: {
    type: String,
    enum: ["time-in", "time-out", "overdue", "confirmation", "pending", "declined"],
    required: true,
  },
  recipient: { type: ObjectId, require: true },
  content: { type: Content, require: true },
  is_read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const NotificationModel = processConnection.model(
  "notification",
  NotificationSchema
);

module.exports = NotificationModel;

/*
For future updates

deliveryChannel: {
        type: String,
        enum: ['email', 'sms', 'in-app', 'push'],
        required: true
    },
*/
