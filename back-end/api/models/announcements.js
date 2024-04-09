const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AnnouncementSchema = new Schema({
    title: { type: String, require: true },
    message: { type: String, require: true },
    prio:{type: Number, require: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const AnnouncementModel = mongoose.model('announcements', AnnouncementSchema);

module.exports = AnnouncementModel;