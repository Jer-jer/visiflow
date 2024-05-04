const mongoose = require('mongoose');

const processConnection = mongoose.createConnection(
  `${process.env.MONGODB_PROCESS}`
);

const Schema = mongoose.Schema;

const PurposeSchema = new Schema({
  what: [{ type: String, required: true }],
  when: { type: Date, required: true },
  where: [{ type: String, required: true }],
  who: [{ type: String, required: true }],
});

const PurposeModel = processConnection.model('purpose', PurposeSchema);

module.exports = PurposeModel;