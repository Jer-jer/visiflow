const mongoose = require("mongoose");

const processConnection = mongoose.createConnection(
  `${process.env.MONGODB_PROCESS}`
);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Content = new Schema({
  visitor_name: { type: String},
  host_name: { type: String},
  date: { type: Date},
  time_in: { type: Date},
  time_out: { type: Date},
  location: { type: String},
  purpose: { type: String},
  visitor_type: { type: String},
});

const NotificationSchema = new Schema({
  _id: { type: ObjectId, require: false },
  type: {
    type: String,
    enum: ["time-in", "time-out", "confirmation", "pending", "declined"],
    required: true,
  },
  recipient: { type: ObjectId},
  content: { type: Content},
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
