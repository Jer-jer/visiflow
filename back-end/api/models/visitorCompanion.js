const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VisitorModel = require('./visitor');

const VisitorCompanionSchema = new Schema({
    visitor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Visitor',
        require: true
    }
});

Object.keys(VisitorModel.schema.paths).forEach((key) => {
    // Exclude _id and __v fields from inheritance
    if (key !== '_id' && key !== '__v') {
        VisitorCompanionSchema.add({ [key]: VisitorModel.schema.paths[key] });
    }
});

const VisitorCompanionModel = mongoose.model('VisitorCompanion', VisitorCompanionSchema);

module.exports = VisitorCompanionModel;