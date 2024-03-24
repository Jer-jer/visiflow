const mongoose = require('mongoose');

const logsConnection = mongoose.createConnection(`${process.env.MONGODB_LOGS}`);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const systemLogSchema = new Schema({
    _id: { type: ObjectId },
    user: { type: ObjectId, require: true },
    type: {
       type: String,
       enum: ['time_in', 'update', 'delete'],
       require: true
    },
    created_at: { type: Date, default: Date.now }
});

const systemLogModel = logsConnection.model('systemLog', systemLogSchema);

module.exports = systemLogModel;