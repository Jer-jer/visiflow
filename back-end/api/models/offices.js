const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OfficesSchema = new Schema({
    name: { type: String, require: true },
    roomNo: { type: String  },
    //person in charge
    pic: { type: String, require: true },
    contact: { type: String, require: true },
    email: { type: String, require: true },
    //operating hours
    opentime: { type: Date, default: Date.now },
    closetime: { type: Date, default: Date.now },
    openday: { type: [Boolean], default: [false,false,false,false,false,false,false]},
    // availability:{type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// OfficesSchema.index({ name: 1, roomNo: 1 }, { unique: true });

const OfficesModel = mongoose.model('offices', OfficesSchema);

module.exports = OfficesModel;