const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VisitorCompanionSchema = new Schema({
    visitorId: {
        type: Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    }
});

const VisitorCompanionModel = mongoose.model('VisitorCompanion', VisitorCompanionSchema);

module.exports = VisitorCompanionModel;